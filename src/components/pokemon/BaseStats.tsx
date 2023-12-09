import { Stack, Typography } from '@mui/material';
import React from 'react';
import { useSearch } from '@tanstack/react-router';
import { PokemonSearchParams } from '../../routes';
import { useGetPokemonByName } from '../../hooks/pokemon';
import { isNilOrEmpty } from '../../helpers';

export const BaseStats = () => {
  const search = useSearch({ from: '/pokemon/' }) as PokemonSearchParams;
  const { data } = useGetPokemonByName(search.name);

  if (isNilOrEmpty(data) || isNilOrEmpty(data.stats)) {
    return null;
  }

  return (
    <>
      <Typography component="h2" variant="h5">
        Base Stats
      </Typography>
      <Stack direction="row" gap={3} flexWrap="wrap" sx={{ justifyContent: { xs: 'center', sm: 'start' } }}>
        {data.stats.map((stat) => (
          <Stack key={stat.stat.name} alignItems="center">
            <Typography textTransform="capitalize" variant="h6">
              {stat.stat.name}
            </Typography>
            <Typography>{stat.base_stat}</Typography>
          </Stack>
        ))}
      </Stack>
    </>
  );
};
