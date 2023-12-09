import { SearchBar } from './SearchBar';
import { SearchContextProvider } from '../../store/SearchContext';
import { Stack } from '@mui/material';
import { TypeFilter } from './TypeFilter';

export const SearchView = () => {
  return (
    <SearchContextProvider>
      <Stack flex={1} width="100%">
        <SearchBar />
        <TypeFilter />
      </Stack>
    </SearchContextProvider>
  );
};
