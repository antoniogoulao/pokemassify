import { Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

export const AppErrorBoundary = () => {
  return (
    <Stack>
      <img src={'/images/magikarp.png'} alt="error magikarp" />
      <Typography component="h1" variant="h4">
        <FormattedMessage id="error.app" defaultMessage='Unable to load Pokémassify'/>
      </Typography>
    </Stack>
  );
};
