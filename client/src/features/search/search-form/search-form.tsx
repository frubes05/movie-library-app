import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Stack } from "@mui/material";

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
  const { control, handleSubmit } = useForm<{ query: string }>({
    defaultValues: { query },
  });

  const onSubmit = (data: { query: string }) => {
    onSubmitSearch(data.query.trim());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" spacing={2}>
        <Controller
          name="query"
          control={control}
          render={({ field }) => (
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
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary">
          Search
        </Button>
      </Stack>
    </form>
  );
};

export default SearchForm;
