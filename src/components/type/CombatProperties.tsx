import { Stack, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

export const CombatProperties = ({ children, label }: { children: ReactNode; label: ReactNode }) => {
  return (
    <Stack spacing={2}>
      <Typography component="h3" variant="h6" fontWeight="bold">
        {label}
      </Typography>
      <Stack direction="row" gap={3}>
        {children}
      </Stack>
    </Stack>
  );
};
