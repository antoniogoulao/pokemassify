import { Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

export const AppErrorBoundary = () => {
  return (
    <Stack alignItems="center" padding={4} gap={3} sx={{ backgroundColor: '#ffffffaa' }}>
      <img src={'/images/magikarp.png'} alt="error magikarp" width={120} />
      <Typography component="h1" variant="h4">
        <FormattedMessage id="error.app" defaultMessage="Unable to load Pokémassify" />
      </Typography>
      <Stack>
        <Typography component="h2" variant="h6">
          <FormattedMessage
            id="error.appDescription"
            defaultMessage="We could not load all the data we needed due to a technical issue."
          />
        </Typography>
        <Typography component="h2" variant="h6">
          <FormattedMessage
            id="error.appDescription"
            defaultMessage="Please verify your internet connection and try connecting again. If the issue keeps happening, grab your Game Boy."
          />
        </Typography>
      </Stack>
    </Stack>
  );
};
