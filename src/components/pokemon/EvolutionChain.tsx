import { useGetEvolutionChainById } from '../../hooks/evolutionChain';
import { Skeleton, Stack, Typography } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import { isNilOrEmpty } from '../../helpers';
import { PokemonAvatar } from './PokemonAvatar';
import { useSearch } from '@tanstack/react-router';
import { PokemonSearchParams } from '../../routes';
import { useGetPokemonSpeciesByName } from '../../hooks/pokemonSpecies';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export const EvolutionChain = () => {
  const search = useSearch({ from: '/pokemon/' }) as PokemonSearchParams;
  const { data: pokemonSpecies } = useGetPokemonSpeciesByName(search.name);
  const { data, isLoading } = useGetEvolutionChainById(
    pokemonSpecies?.evolution_chain.url
      .split('/')
      .filter((n) => n)
      .slice(-1)[0] ?? '',
  );

  if (isLoading) {
    return <Skeleton width={1000} height={200} />;
  }

  if (isNilOrEmpty(data)) {
    return null;
  }

  return (
    <>
      <Typography component="h2" variant="h5">
        <FormattedMessage id="label.evolution" defaultMessage="Evolution" />
      </Typography>
      <Stack gap={3}>
        {data.evolutions.length === 1 && (
          <Typography>
            <FormattedMessage id="info.noEvolution" defaultMessage="This Pokémon does not evolve." />
          </Typography>
        )}
        <Stack
          direction="row"
          divider={<ArrowForwardIos sx={{ color: 'white', height: 30 }} />}
          gap={2}
          alignItems="center"
          sx={{ ml: 2 }}
          flexWrap="wrap"
        >
          {data.evolutions.map((evolution) => (
            <PokemonAvatar key={evolution.name} name={evolution.name} selected={evolution.name === search.name} />
          ))}
        </Stack>
      </Stack>
    </>
  );
};
