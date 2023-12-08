import { Autocomplete, InputAdornment, ListItem, TextField, Typography } from '@mui/material';
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
  const { isLoadingPokemons, search } = useContext(SearchContext);

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
      disabled={isLoadingPokemons}
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
              <Typography textTransform="capitalize">{option.name}</Typography>
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
