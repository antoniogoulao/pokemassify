import { useGetPokemonSpeciesByName } from '../../hooks/pokemonSpecies';
import { Skeleton, Stack, Typography } from '@mui/material';
import React from 'react';
import { isNilOrEmpty } from '../../helpers';
import { useSearch } from '@tanstack/react-router';
import { PokemonSearchParams } from '../../routes';

export const PokemonDescription = () => {
  const search = useSearch({ from: '/pokemon/' }) as PokemonSearchParams;
  const { data: pokemonSpecies, isFetching: isFetchingPokemonSpecies } = useGetPokemonSpeciesByName(search.name);

  if (isFetchingPokemonSpecies) {
    return <Skeleton width={500} height={100} />;
  }

  if (isNilOrEmpty(pokemonSpecies)) {
    return null;
  }

  return (
    <>
      {pokemonSpecies.flavor_text_entries[0] && (
        <Stack spacing={1}>
          <Typography component="h2" variant="h5">
            About
          </Typography>
          <Typography>{pokemonSpecies.flavor_text_entries[0].flavor_text}</Typography>
        </Stack>
      )}
    </>
  );
};
