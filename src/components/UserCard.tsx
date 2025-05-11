import React from "react";
import { memo } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import styled from "@emotion/styled";

const StyledCard = styled(Card)`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #f8bbd0, #e1bee7);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 8px;
`;

const StyledImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 8px;
`;

interface UserCardProps {
  avatarUrl: string;
  username: string;
}

const UserCard: React.FC<UserCardProps> = ({ avatarUrl, username }) => {
  return (
    <StyledCard>
      <StyledImg src={avatarUrl} alt={username} />
      <CardContent>
        <Typography variant="h6">{username}</Typography>
      </CardContent>
    </StyledCard>
  );
};

export default memo(UserCard);
