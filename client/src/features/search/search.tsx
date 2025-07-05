import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Stack, Box } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

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

  return (
    <form
      onSubmit={handleSubmit((data: { query: string }) =>
        onSubmitSearch(data.query.trim())
      )}
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
                    handleSubmit((data: { query: string }) =>
                      onSubmitSearch(data.query.trim())
                    )();
                  }
                }}
                sx={{
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    "& fieldset": {
                      border: "2px solid black",
                    },
                    "&:hover fieldset": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                      borderWidth: "2px",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "black",
                    fontWeight: 500,
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "black",
                  },
                }}
              />
              <Button
                type="button"
                sx={{
                  position: "absolute",
                  right: "-4px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  height: "56px",
                  bgcolor: "black",
                  color: "white",
                  borderRadius: 2,
                  "&.Mui-disabled": {
                    color: "white",
                  },
                }}
                disabled={field.value.trim() === ""}
                onClick={() => {
                  reset({ query: "" });
                }}
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
