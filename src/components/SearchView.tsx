import { SearchBar } from './SearchBar';
import { SearchContextProvider } from '../store/SearchContext';

export const SearchView = () => {
  return (
    <SearchContextProvider>
      <SearchBar />
    </SearchContextProvider>
  );
};
