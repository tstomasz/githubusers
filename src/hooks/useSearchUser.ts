import { useQuery } from "@tanstack/react-query";

const baseURL = "https://api.github.com";

export const useSearchUser = (
  query: string,
  page: number,
  perPage: number = 15,
) => {
  return useQuery(
    ["searchUsers", query, page],
    async () => {
      const response = await fetch(
        `${baseURL}/search/users?q=${query}&page=${page}&per_page=${perPage}`,
      );
      if (!response.ok) {
        throw new Error("something went wrong");
      }
      return response.json();
    },
    {
      enabled: !!query,
    },
  );
};
