import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Stack, Box } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { useNotification } from "../../context/notification";

interface ISearchForm {
  query: string;
  onInputChange: (input: string) => void;
  onSubmitSearch: (input: string) => void;
  isMobile: boolean;
}

const SearchForm = ({
  query,
  onInputChange,
  onSubmitSearch,
  isMobile,
}: ISearchForm) => {
  const { control, handleSubmit, reset } = useForm<{ query: string }>({
    defaultValues: { query },
  });
  const { showNotification } = useNotification();

  const handleFormSubmit = (data: { query: string }) => {
    const trimmedQuery = data.query.trim();
    
    if (!trimmedQuery) {
      showNotification(
        "Please enter a search term to find movies.",
        "warning",
        4000
      );
      return;
    }

    if (trimmedQuery.length < 2) {
      showNotification(
        "Search term must be at least 2 characters long.",
        "warning",
        4000
      );
      return;
    }

    if (trimmedQuery.length > 100) {
      showNotification(
        "Search term is too long. Please use a shorter search term.",
        "warning",
        4000
      );
      return;
    }

    // Check for potentially problematic characters
    const invalidChars = /[<>{}[\]\\]/;
    if (invalidChars.test(trimmedQuery)) {
      showNotification(
        "Search term contains invalid characters. Please use only letters, numbers, and basic punctuation.",
        "warning",
        5000
      );
      return;
    }

    onSubmitSearch(trimmedQuery);
    showNotification(
      `Searching for "${trimmedQuery}"...`,
      "info",
      3000
    );
  };

  const handleReset = () => {
    reset({ query: "" });
    onInputChange("");
    onSubmitSearch("");
    showNotification(
      "Search cleared. Showing popular movies.",
      "info",
      3000
    );
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      data-testid="search"
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "24px",
        }}
      >
        <Controller
          name="query"
          control={control}
          render={({ field }) => (
            <Box
              sx={{
                position: "relative",
                width: "100%",
              }}
            >
              <TextField
                fullWidth
                label="Search for a movie"
                variant="outlined"
                value={field.value}
                onChange={(e) => {
                  onInputChange(e.target.value);
                  field.onChange(e);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit(handleFormSubmit)();
                  }
                }}
                sx={{
                  border: "2px solid black",
                  borderRadius: 2,
                }}
                error={field.value.length > 0 && field.value.trim().length < 2}
                helperText={
                  field.value.length > 0 && field.value.trim().length < 2
                    ? "Search term must be at least 2 characters"
                    : field.value.length > 100
                    ? "Search term is too long"
                    : ""
                }
                inputProps={{
                  maxLength: 150, // Hard limit to prevent abuse
                }}
              />
              <Button
                type="button"
                variant="contained"
                sx={{
                  position: "absolute",
                  right: "-4px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  height: "56px",
                  bgcolor: "black",
                  color: "white",
                  borderRadius: 2,
                }}
                disabled={field.value.trim() === ""}
                onClick={handleReset}
              >
                <ClearIcon />
                Reset
              </Button>
            </Box>
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            width: isMobile ? "100%" : "auto",
            minWidth: isMobile ? "unset" : "150px",
            margin: "0 !important",
            height: isMobile ? "58px" : "auto",
            borderRadius: 2,
            bgcolor: "rgb(135 131 208)",
          }}
        >
          <SearchIcon />
          Search
        </Button>
      </Stack>
    </form>
  );
};

export default SearchForm;