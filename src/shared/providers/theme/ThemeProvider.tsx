import { ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';

interface ThemeProviderProps {
  children?: ReactNode;
}

const theme = createTheme({
  // https://mui.com/material-ui/customization/default-theme/?expand-path=$.palette
  palette: {},
  spacing: 8,
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};
