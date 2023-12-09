import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { ThemeProvider } from '../../shared/providers/theme/ThemeProvider';
import { IntlProvider } from 'react-intl';
import { enGB } from '../../shared/providers/i18n/lang';

export const AllTheProviders = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale={'en-GB'} messages={enGB} defaultLocale="en-GB">
        <ThemeProvider>{children}</ThemeProvider>
      </IntlProvider>
    </QueryClientProvider>
  );
};
