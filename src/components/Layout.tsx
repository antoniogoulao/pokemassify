import { Outlet } from '@tanstack/react-router';
import { Box } from '@mui/material';
import { isDev } from '../helpers';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const Layout = () => {
  return (
    <Box
      component="main"
      flex={1}
      height={1}
      tabIndex={-1}
      id="main-content"
      overflow="auto"
      padding={2}
      sx={{ backgroundImage: `url(/images/background/background.png)` }}
    >
      <Outlet />
      {isDev && (
        <>
          <ReactQueryDevtools />
        </>
      )}
    </Box>
  );
};
