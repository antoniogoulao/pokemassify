import { Stack, Typography } from '@mui/material';
import { useIntl } from 'react-intl';

export const AppErrorBoundary = () => {
  const intl = useIntl();
  return (
    <Stack>
      <img src={'/images/magikarp.png'} alt="error magikarp" />
      <Typography component="h1" variant="h4">
        {intl.formatMessage({ defaultMessage: 'Unable to load Pokémassify' })}
      </Typography>
    </Stack>
  );
};
