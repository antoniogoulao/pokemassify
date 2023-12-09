import { Stack, Typography } from '@mui/material';
import React from 'react';
import { useSearch } from '@tanstack/react-router';
import { PokemonSearchParams } from '../../routes';
import { useGetPokemonByName } from '../../hooks/pokemon';
import { isNilOrEmpty } from '../../helpers';

export const Abilities = () => {
  const search = useSearch({ from: '/pokemon/' }) as PokemonSearchParams;
  const { data } = useGetPokemonByName(search.name);

  if (isNilOrEmpty(data) || isNilOrEmpty(data.abilities)) {
    return null;
  }

  return (
    <>
      <Typography component="h2" variant="h5">
        Abilities
      </Typography>
      <Stack direction="row" gap={3} sx={{ justifyContent: { xs: 'center', sm: 'start' } }} flexWrap="wrap">
        {data.abilities.map((ability) => (
          <Typography key={ability.ability.name} textTransform="capitalize">
            {ability.ability.name}
          </Typography>
        ))}
      </Stack>
    </>
  );
};
