import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useSearchUser } from "../../hooks/useSearchUser";
import UsersList from "./UsersList";

jest.mock("../../hooks/useSearchUser");

describe("UsersList", () => {
  it("renders a loader when fetching data", () => {
    (useSearchUser as jest.Mock).mockReturnValue({
      data: null,
      isFetching: true,
      isError: false,
      error: null,
    });

    render(<UsersList />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("displays an error message when an error occurs", () => {
    (useSearchUser as jest.Mock).mockReturnValue({
      data: null,
      isFetching: false,
      isError: true,
      error: { message: "Something went wrong" },
    });

    render(<UsersList />);
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("shows 'No users found' message when no users are returned", () => {
    (useSearchUser as jest.Mock).mockReturnValue({
      data: { total_count: 0, items: [] },
      isFetching: false,
      isError: false,
      error: null,
    });

    render(<UsersList />);
    expect(screen.getByText(/no users found/i)).toBeInTheDocument();
  });

  it("clears the search input when the clear button is clicked", () => {
    (useSearchUser as jest.Mock).mockReturnValue({
      data: null,
      isFetching: false,
      isError: false,
      error: null,
    });

    render(<UsersList />);
    const input = screen.getByLabelText(/search github users/i);
    fireEvent.change(input, { target: { value: "test" } });
    expect(input).toHaveValue("test");

    const clearButton = screen.getByRole("button");
    fireEvent.click(clearButton);
    expect(input).toHaveValue("");
  });
});
