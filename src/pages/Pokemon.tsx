import { Avatar, Paper, Skeleton, Stack, Typography } from '@mui/material';
import { useSearch } from '@tanstack/react-router';
import { PokemonSearchParams } from '../routes';
import { useGetPokemonByName } from '../hooks/pokemon';
import { isNilOrEmpty } from '../helpers';
import React from 'react';
import { colorType } from '../utils/colorType';
import { useGetPokemonSpeciesByName } from '../hooks/pokemonSpecies';
import { EvolutionChain } from '../components/EvolutionChain';

export const Pokemon = () => {
  const search = useSearch({ from: '/pokemon/' }) as PokemonSearchParams;
  const { data, isLoading } = useGetPokemonByName(search.name);
  const { data: pokemonSpecies, isFetching: isFetchingPokemonSpecies } = useGetPokemonSpeciesByName(search.name);

  if (isLoading || isFetchingPokemonSpecies) {
    return <Skeleton width={100} height={500} />;
  }

  if (isNilOrEmpty(data) || isNilOrEmpty(pokemonSpecies)) {
    return null;
  }

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      gap={2.5}
      sx={{
        padding: 2,
        minHeight: { xs: 0, lg: 'calc(100vh - 320px)' },
        backgroundColor: colorType(data.types[0].type.name),
      }}
    >
      <Stack
        sx={{
          width: {
            xs: '100%',
            sm: '20%',
          },
        }}
        spacing={2}
        alignItems="center"
        flexWrap="wrap"
      >
        <Stack spacing={3} alignItems="center" flexWrap="wrap">
          <Typography component="h1">#{data.id}</Typography>
          <Typography component="h1" textTransform="capitalize">
            {data.name}
          </Typography>
        </Stack>
        <img
          width={180}
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
          alt={data.name}
        />
        <Stack direction="row" justifyContent="center" spacing={1}>
          {data.types.map((type) => (
            <Avatar
              key={type.type.name}
              component={Paper}
              elevation={3}
              src={`/images/types/${type.type.name}_icon.png`}
              alt={type.type.name}
              sx={{
                width: 30,
                height: 30,
              }}
            />
          ))}
        </Stack>
        <Stack direction="row" spacing={2}>
          <Stack alignItems="center" flexWrap="wrap">
            <Typography>Height</Typography>
            <Typography>{(data.height / 10).toFixed(1)}m</Typography>
          </Stack>
          <Stack alignItems="center" flexWrap="wrap">
            <Typography>Weight</Typography>
            <Typography>{(data.weight / 10).toFixed(1)}Kg</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack spacing={2}>
        {pokemonSpecies.flavor_text_entries[0] && (
          <Stack spacing={1}>
            <Typography component="h2">About</Typography>
            <Typography>{pokemonSpecies.flavor_text_entries[0].flavor_text}</Typography>
          </Stack>
        )}
        <Typography component="h2">Abilities</Typography>
        <Stack direction="row" spacing={3}>
          {data.abilities.map((ability) => (
            <Typography key={ability.ability.name} textTransform="capitalize">
              {ability.ability.name}
            </Typography>
          ))}
        </Stack>
        <Typography component="h2">Base Stats</Typography>
        <Stack direction="row" gap={3} flexWrap="wrap">
          {data.stats.map((stat) => (
            <Stack key={stat.stat.name} alignItems="center">
              <Typography textTransform="capitalize">{stat.stat.name}</Typography>
              <Typography>{stat.base_stat}</Typography>
            </Stack>
          ))}
        </Stack>
        <Typography component="h2">Evolution</Typography>
        <EvolutionChain
          evolutionChainId={
            pokemonSpecies.evolution_chain.url
              .split('/')
              .filter((n) => n)
              .slice(-1)[0]
          }
          name={search.name}
        />
      </Stack>
    </Stack>
  );
};
