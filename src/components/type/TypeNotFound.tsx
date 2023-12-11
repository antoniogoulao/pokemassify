import { Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import React from 'react';

export const TypeNotFound = ({ message }: { message?: string }) => {
  return (
    <Stack gap={2} alignItems="center" justifyContent="center" sx={{ height: '100%', px: 5 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'common.white' }}>
        <FormattedMessage id="info.typeNotFound" defaultMessage="Type Not Found" />
      </Typography>
      <img src="/images/magikarp.png" alt="type not found" width={240} />
      <Typography variant="h5" color="common.white">
        {message ?? (
          <FormattedMessage
            id="quote.type"
            defaultMessage="All the other types (Water, Electric, Grass, Fighting, Flying, Psychic and Dark) have been combined with every other type at least once as of the ninth generation!"
          />
        )}
      </Typography>
    </Stack>
  );
};
