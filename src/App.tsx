import { RouterProvider } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './shared/providers/theme/ThemeProvider';
import { router } from './routes';
import { LocaleProvider } from './shared/providers/i18n/LocaleProvider';
import { enGB, frFR, ptPT } from './shared/providers/i18n/lang';

export const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LocaleProvider messages={{ enGB, ptPT, frFR }}>
          <RouterProvider router={router} />
        </LocaleProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
