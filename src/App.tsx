import React from "react";
import logo from "./logo.svg";
import "./App.css";
import UsersList from "./views/UsersList/UsersList";
import { Box, Container } from "@mui/material";

function App() {
  return (
    <Container maxWidth={"md"}>
      <Box my={"4"}>
        <UsersList />
      </Box>
    </Container>
  );
}

export default App;
