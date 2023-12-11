import { Stack, Typography } from '@mui/material';
import { isNilOrEmpty } from '../../helpers';

export const Loading = ({ message }: { message?: string }) => {
  return (
    <Stack gap={2} alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
      <img src="/images/loading.gif" alt="loading" width={240} />
      {!isNilOrEmpty(message) && (
        <Typography variant="h5" color="common.white">
          {message}
        </Typography>
      )}
    </Stack>
  );
};
