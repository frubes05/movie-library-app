import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "../../test/test-utils";
import userEvent from "@testing-library/user-event";
import SearchForm from "./search";

describe("SearchForm", () => {
  const mockProps = {
    query: "",
    onInputChange: vi.fn(),
    onSubmitSearch: vi.fn(),
    isMobile: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render search input and button", () => {
    render(<SearchForm {...mockProps} />);

    expect(screen.getByLabelText("Search for a movie")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
  });

  it("should call onInputChange when typing in input", async () => {
    const user = userEvent.setup();
    render(<SearchForm {...mockProps} />);

    const input = screen.getByLabelText("Search for a movie");
    await user.type(input, "test movie");

    expect(mockProps.onInputChange).toHaveBeenCalledWith("test movie");
  });

  it("should call onSubmitSearch when form is submitted", async () => {
    const user = userEvent.setup();
    render(<SearchForm {...mockProps} />);

    const input = screen.getByLabelText("Search for a movie");
    const searchButton = screen.getByRole("button", { name: /search/i });

    await user.type(input, "test movie");
    await user.click(searchButton);

    await waitFor(() => {
      expect(mockProps.onSubmitSearch).toHaveBeenCalledWith("test movie");
    });
  });

  it("should call onSubmitSearch when Enter key is pressed", async () => {
    const user = userEvent.setup();
    render(<SearchForm {...mockProps} />);

    const input = screen.getByLabelText("Search for a movie");
    await user.type(input, "test movie");
    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(mockProps.onSubmitSearch).toHaveBeenCalledWith("test movie");
    });
  });

  it("should reset form when reset button is clicked", async () => {
    const user = userEvent.setup();
    render(<SearchForm {...mockProps} query="initial query" />);

    const resetButton = screen.getByRole("button", { name: /reset/i });
    await user.click(resetButton);

    const input = screen.getByLabelText("Search for a movie");
    expect(input).toHaveValue("");
  });

  it("should disable reset button when input is empty", () => {
    render(<SearchForm {...mockProps} />);

    const resetButton = screen.getByRole("button", { name: /reset/i });
    expect(resetButton).toBeDisabled();
  });

  it("should trim whitespace when submitting", async () => {
    const user = userEvent.setup();
    render(<SearchForm {...mockProps} />);

    const input = screen.getByLabelText("Search for a movie");
    const searchButton = screen.getByRole("button", { name: /search/i });

    await user.type(input, "  test movie  ");
    await user.click(searchButton);

    await waitFor(() => {
      expect(mockProps.onSubmitSearch).toHaveBeenCalledWith("test movie");
    });
  });
});
