import { Stack } from '@mui/material';
import { SearchView } from './search/SearchView';

export const NavBar = () => {
  return (
    <Stack direction="column" flex={1} alignItems="center">
      <img src={'/images/pokemon.png'} width={220} alt="pokemon logo" />
      <SearchView />
    </Stack>
  );
};
