import { Avatar, Paper, Skeleton, Stack, Tooltip, Typography } from '@mui/material';
import { useSearch } from '@tanstack/react-router';
import { PokemonSearchParams } from '../routes';
import { useGetPokemonByName } from '../hooks/pokemon';
import { isNilOrEmpty } from '../helpers';
import React from 'react';
import { colorType } from '../utils/colorType';
import { EvolutionChain } from '../components/pokemon/EvolutionChain';
import { PokemonDescription } from '../components/pokemon/PokemonDescription';
import { BaseStats } from '../components/pokemon/BaseStats';
import { Abilities } from '../components/pokemon/Abilities';
import { FormattedMessage } from 'react-intl';

export const Pokemon = () => {
  const search = useSearch({ from: '/pokemon/' }) as PokemonSearchParams;
  const { data, isLoading } = useGetPokemonByName(search.name);

  if (isLoading) {
    return <Skeleton width={100} height={500} />;
  }

  if (isNilOrEmpty(data)) {
    return null;
  }

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      gap={2.5}
      sx={{
        mt: 2,
        padding: 2,
        minHeight: { xs: 0, lg: 'calc(100vh - 320px)' },
        backgroundColor: colorType(data.types[0].type.name),
      }}
    >
      <Stack
        sx={{
          width: {
            xs: '100%',
            sm: '33%',
          },
        }}
        spacing={2}
        alignItems="center"
        flexWrap="wrap"
      >
        <Stack spacing={3} alignItems="center" flexWrap="wrap">
          <Typography component="h1" variant="h4">
            #{data.id}
          </Typography>
          <Typography component="h1" variant="h4" textTransform="capitalize">
            {data.name}
          </Typography>
        </Stack>
        <>
          <img
            width={180}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
            alt={data.name}
          />
          <img
            width={48}
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${data.id}.gif`}
            alt={data.name}
          />
        </>
        <Stack direction="row" justifyContent="center" spacing={1}>
          {data.types.map((type) => (
            <Tooltip key={type.type.name} title={type.type.name}>
              <Avatar
                component={Paper}
                elevation={3}
                src={`/images/types/${type.type.name}_icon.png`}
                alt={type.type.name}
                sx={{
                  width: 30,
                  height: 30,
                }}
              />
            </Tooltip>
          ))}
        </Stack>
        <Stack direction="row" spacing={2}>
          <Stack alignItems="center" flexWrap="wrap">
            <Typography variant="h6">
              <FormattedMessage id="label.height" defaultMessage="Height" />
            </Typography>
            <Typography>{(data.height / 10).toFixed(1)}m</Typography>
          </Stack>
          <Stack alignItems="center" flexWrap="wrap">
            <Typography variant="h6">
              <FormattedMessage id="label.weight" defaultMessage="Weight" />
            </Typography>
            <Typography>{(data.weight / 10).toFixed(1)}Kg</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack spacing={2}>
        <PokemonDescription />
        <Abilities />
        <BaseStats />
        <EvolutionChain />
      </Stack>
    </Stack>
  );
};
