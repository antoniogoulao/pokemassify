import { Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import React from 'react';

export const PokemonNotFound = ({ message }: { message?: string }) => {
  return (
    <Stack gap={2} alignItems="center" justifyContent="center" sx={{ height: '100%', px: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'common.white' }}>
        <FormattedMessage id="info.notFound" defaultMessage="Pokémon Not Found" />
      </Typography>
      <img src="/images/magikarp.png" alt="pokemon not found" width={240} />
      <Typography variant="h5" color="common.white">
        {message ? (
          message
        ) : (
          <FormattedMessage
            id="quote.magikarp"
            defaultMessage="Pokédex: A Magikarp living for many years can leap a mountain using Splash. The move remains useless, though."
          />
        )}
      </Typography>
    </Stack>
  );
};
