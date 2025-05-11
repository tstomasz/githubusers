import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import {
  TextField,
  InputAdornment,
  CircularProgress,
  IconButton,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "@emotion/styled";

import { useSearchUser } from "../../hooks/useSearchUser";
import { useDebounce } from "../../hooks/useDebounce";
import UserCard from "../../components/UserCard";
import NoResultsFound from "../../components/NoResultsFound";

const Container = styled(Box)`
  border: 2px solid black;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 16px;
  background: linear-gradient(135deg, #f0f8ff, #e6e6fa);
  max-width: 800px;
  margin: 32px auto;
`;

const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: #ccc;
    }
    &:hover fieldset {
      border-color: #888;
    }
    &.Mui-focused fieldset {
      border-color: #4caf50;
    }
  }

  & .MuiInputLabel-root {
    color: #ccc;
  }
  & .MuiInputLabel-root.Mui-focused {
    color: #4caf50;
  }
  & .MuiInputLabel-root:hover {
    color: #888;
  }
`;

const StyledLoader = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

interface User {
  id: number;
  avatar_url: string;
  login: string;
}

const UsersList = () => {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { control, watch, setValue } = useForm<{ query: string }>({
    defaultValues: { query: "" },
  });

  const query = watch("query");

  // helpful functional programming technique is to use a custom React hook for debouncing input values. This prevents excessive API calls as the user types, improving performance and user experience.
  const debouncedQuery = useDebounce(query, 2000);

  const { data, isFetching, isError, error } = useSearchUser(
    debouncedQuery,
    page,
    15,
  );

  useEffect(() => {
    if (data) {
      setUsers((prevUsers) =>
        page === 1 ? data.items : [...prevUsers, ...data.items],
      );
      setHasMore(data.items.length === 15);
    }
  }, [data, page]);

  const handleClear = useCallback(() => {
    setValue("query", "");
    setUsers([]);
    setPage(1);
    setHasMore(true);
  }, [setValue]);

  const loadMore = useCallback(() => {
    if (!isFetching && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isFetching, hasMore]);

  return (
    <Container>
      <form>
        <Controller
          name="query"
          control={control}
          render={({ field }) => (
            <StyledTextField
              {...field}
              label="Search Github Users"
              variant="outlined"
              fullWidth
              margin="normal"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={query ? handleClear : undefined}>
                        {query ? <ClearIcon /> : <SearchIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          )}
        />
      </form>
      {isFetching && page === 1 && (
        <StyledLoader>
          <CircularProgress />
        </StyledLoader>
      )}
      {isError && <p>Error: {(error as Error).message}</p>}
      {data?.total_count === 0 && <NoResultsFound message={"No users found"} />}
      {users.length > 0 && (
        <InfiniteScroll
          dataLength={users.length}
          next={loadMore}
          hasMore={hasMore}
          loader={<CircularProgress key={0} />}
        >
          {users.map((user: any) => (
            <UserCard
              key={user.id}
              avatarUrl={user.avatar_url}
              username={user.login}
            />
          ))}
        </InfiniteScroll>
      )}
    </Container>
  );
};

export default UsersList;
