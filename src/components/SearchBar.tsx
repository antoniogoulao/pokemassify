import { Autocomplete, InputAdornment, ListItem, ListItemText, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { Search } from '@mui/icons-material';
import { SearchContext } from '../store/SearchContext';
import { PokemonListItemResponse } from '../types/pokemon';
import { useDebouncedState } from '@react-hookz/web';
import { INPUT_DEBOUNCE_TIME } from '../constants';
import { Link } from '@tanstack/react-router';

export const SearchBar = () => {
  const [query, setQueryDebounced] = useDebouncedState('', INPUT_DEBOUNCE_TIME);
  const [queryValue, setQueryValue] = useState('');
  const [results, setResults] = useState<PokemonListItemResponse[]>([]);
  const { isLoading, search } = useContext(SearchContext);

  useEffect(() => {
    setResults(search(query));
  }, [query, search]);

  useEffect(() => {
    setQueryDebounced(queryValue);
  }, [queryValue, setQueryDebounced]);

  const handleChange = (value: string) => {
    setQueryValue(value);
  };

  return (
    <Autocomplete
      freeSolo
      fullWidth
      openOnFocus
      placeholder="Search"
      disabled={isLoading}
      options={results}
      inputValue={queryValue}
      getOptionLabel={(option) => (option as PokemonListItemResponse).name ?? option}
      isOptionEqualToValue={(option, value) => {
        return option.name === value.name;
      }}
      renderOption={(props, option) => {
        return (
          <ListItem {...props}>
            <Link to={`/pokemon`} search={{ name: option.name }}>
              <ListItemText>{option.name}</ListItemText>
            </Link>
          </ListItem>
        );
      }}
      onInputChange={(_, newValue) => handleChange(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          value={queryValue}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start" disablePointerEvents>
                <Search />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};
