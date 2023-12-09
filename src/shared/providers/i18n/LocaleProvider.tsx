import { IntlProvider, MessageFormatElement } from 'react-intl';
import { ReactNode } from 'react';
import { enGB } from './lang';

interface LocaleProviderProps {
  children: ReactNode;
  messages: Record<string, Record<string, string> | Record<string, MessageFormatElement[]>>;
}

export const LocaleProvider = ({ children, messages }: LocaleProviderProps) => {
  const locale = navigator.language;

  return (
    <IntlProvider locale={locale} messages={messages[locale.replace('-', '')] ?? enGB} defaultLocale={'en-GB'}>
      {children}
    </IntlProvider>
  );
};
