import { render, screen } from "@testing-library/react";
import UserCard from "./UserCard";

describe("UserCard", () => {
  const mockProps = {
    avatarUrl: "https://example.com/avatar.png",
    username: "testuser",
  };

  it("renders the username", () => {
    render(<UserCard {...mockProps} />);
    expect(screen.getByText("testuser")).toBeInTheDocument();
  });

  it("renders the avatar with correct src", () => {
    render(<UserCard {...mockProps} />);
    const avatarElement = screen.getByRole("img", { name: /testuser/i });
    expect(avatarElement).toHaveAttribute(
      "src",
      "https://example.com/avatar.png",
    );
  });

  it("renders with all required props", () => {
    render(<UserCard {...mockProps} />);
    expect(screen.getByText("testuser")).toBeInTheDocument();
  });
});
