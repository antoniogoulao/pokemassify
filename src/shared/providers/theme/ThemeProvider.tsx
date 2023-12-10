import { ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';

interface ThemeProviderProps {
  children?: ReactNode;
}

const theme = createTheme({
  palette: {},
  spacing: 8,
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
