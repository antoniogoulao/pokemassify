import {
  Autocomplete,
  InputAdornment,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { ArrowForwardIos, Search } from '@mui/icons-material';
import { SearchContext } from '../../store/SearchContext';
import { PokemonListItemResponse } from '../../types/pokemon';
import { useDebouncedState } from '@react-hookz/web';
import { INPUT_DEBOUNCE_TIME } from '../../constants';
import { useNavigate } from '@tanstack/react-router';
import { PokemonSprite } from './PokemonSprite';
import { useIntl } from 'react-intl';

export const SearchBar = () => {
  const [query, setQueryDebounced] = useDebouncedState('', INPUT_DEBOUNCE_TIME);
  const [queryValue, setQueryValue] = useState('');
  const [results, setResults] = useState<PokemonListItemResponse[]>([]);
  const { isLoadingPokemons, search } = useContext(SearchContext);
  const navigate = useNavigate();
  const intl = useIntl();

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
      disabled={isLoadingPokemons}
      options={results}
      inputValue={queryValue}
      getOptionLabel={(option) => (option as PokemonListItemResponse).name ?? option}
      isOptionEqualToValue={(option, value) => {
        return option.name === value.name;
      }}
      renderOption={(props, option) => {
        return (
          <ListItem
            {...props}
            secondaryAction={<ArrowForwardIos />}
            onClick={() => navigate({ to: '/pokemon', search: { name: option.name } })}
          >
            <ListItemIcon>
              <PokemonSprite name={option.name} />
            </ListItemIcon>
            <ListItemText>
              <Typography textTransform="capitalize">{option.name}</Typography>
            </ListItemText>
          </ListItem>
        );
      }}
      onInputChange={(_, newValue) => handleChange(newValue)}
      renderInput={(params) => (
        <TextField
          {...params}
          value={queryValue}
          placeholder={intl.formatMessage({ id: 'label.search', defaultMessage: 'Search' })}
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
      sx={{ background: 'white', border: 'none' }}
    />
  );
};
