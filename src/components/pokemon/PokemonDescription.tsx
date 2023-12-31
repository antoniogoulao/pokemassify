import { useGetPokemonSpeciesByName } from '../../hooks/pokemonSpecies';
import { Skeleton, Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { isNilOrEmpty } from '../../helpers';
import { useSearch } from '@tanstack/react-router';
import { FormattedMessage } from 'react-intl';
import { PokemonSearchParams } from '../../types/router';

export const PokemonDescription = () => {
  const search = useSearch({ from: '/pokemon/' }) as PokemonSearchParams;
  const { data: pokemonSpecies, isFetching: isFetchingPokemonSpecies } = useGetPokemonSpeciesByName(search.name);

  const description = useMemo(() => {
    return (
      pokemonSpecies?.flavor_text_entries.find((entry) => entry.language.name === 'en')?.flavor_text ??
      pokemonSpecies?.flavor_text_entries[0].flavor_text ??
      ''
    );
  }, [pokemonSpecies]);

  if (isFetchingPokemonSpecies) {
    return <Skeleton variant="text" width="100%" height={80} />;
  }

  if (isNilOrEmpty(pokemonSpecies)) {
    return null;
  }

  return (
    <>
      {!isNilOrEmpty(description) && (
        <Stack spacing={1}>
          <Typography component="h2" variant="h5">
            <FormattedMessage id="label.about" defaultMessage="About" />
          </Typography>
          <Typography>{description}</Typography>
        </Stack>
      )}
    </>
  );
};
