import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Stack,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

interface ISearchForm {
  query: string;
  input: string;
  onInputChange: (input: string) => void;
  onSubmitSearch: (input: string) => void;
}

const SearchForm = ({
  query,
  input,
  onInputChange,
  onSubmitSearch,
}: ISearchForm) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { control, handleSubmit } = useForm<{ query: string }>({
    defaultValues: { query },
  });

  const onSubmit = (data: { query: string }) => {
    onSubmitSearch(data.query.trim());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
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
                value={input}
                onChange={(e) => {
                  onInputChange(e.target.value);
                  field.onChange(e);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSubmit(onSubmit)();
                  }
                }}
                sx={{
                  border: "2px solid black",
                  borderRadius: 2,
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
            width: isSmallScreen ? "100%" : "auto",
            minWidth: isSmallScreen ? "unset" : "150px",
            margin: "0 !important",
            height: isSmallScreen ? "58px" : "auto",
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
