import { createContext, ReactNode } from 'react';
import { useGetPokemonList } from '../hooks/pokemon';
import { PokemonListItemResponse } from '../types/pokemon';
import { isNilOrEmpty } from '../helpers';

export const SearchContext = createContext<SearchState>({} as SearchState);

type SearchState = {
  isLoading: boolean;
  search: (query: string) => PokemonListItemResponse[] | [];
};

const initialState = {
  pokemons: [],
  isLoading: false,
  isError: false,
};

interface SearchContextProviderProps {
  children: ReactNode;
}

export const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
  const { data: pokemons, isLoading } = useGetPokemonList();
  const search = (query: string) => {
    if (isNilOrEmpty(query)) {
      return pokemons?.results.slice(0, 10) ?? [];
    }

    const result = pokemons?.results.filter((pokemon) => pokemon.name.includes(query.toLowerCase()));
    return result ?? [];
  };

  return <SearchContext.Provider value={{ isLoading, search }}>{children}</SearchContext.Provider>;
};
