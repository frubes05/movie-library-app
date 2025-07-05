import { render, screen } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import NotFound from "../not-found";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("<NotFound />", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders not found text and back button", () => {
    render(<NotFound />, { wrapper: MemoryRouter });

    expect(screen.getByText(/No movies found/i)).toBeInTheDocument();
    expect(
      screen.getByText(/We couldn't find any results for your search/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Go Back/i })
    ).toBeInTheDocument();
  });

  it("calls navigate(-1) on button click", async () => {
    render(<NotFound />, { wrapper: MemoryRouter });

    const button = screen.getByRole("button", { name: /Go Back/i });
    await userEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
