import { Typography } from '@mui/material';
import { useSearch } from '@tanstack/react-router';
import { PokemonSearchParams } from '../routes';

export const Pokemon = () => {
  const search = useSearch({ from: '/pokemon/' }) as PokemonSearchParams;
  return <Typography>Here's a pokemon named {search.name}</Typography>;
};
