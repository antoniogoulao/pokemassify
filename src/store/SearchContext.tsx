import { createContext, ReactNode } from 'react';
import { useGetPokemonList } from '../hooks/pokemon';
import { PokemonListItemResponse } from '../types/pokemon';
import { isNilOrEmpty } from '../helpers';
import { PokemonTypeListItemResponse } from '../types/pokemonTypes';
import { useGetPokemonTypes } from '../hooks/pokemonTypes';

export const SearchContext = createContext<SearchState>({} as SearchState);

type SearchState = {
  search: (query: string) => PokemonListItemResponse[] | [];
  types: PokemonTypeListItemResponse[] | [];
  isLoadingPokemons: boolean;
  isLoadingTypes: boolean;
};

interface SearchContextProviderProps {
  children: ReactNode;
}

export const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
  const { data: pokemons, isLoading: isLoadingPokemons } = useGetPokemonList();
  const { data: types, isLoading: isLoadingTypes } = useGetPokemonTypes();

  const search = (query: string) => {
    if (isNilOrEmpty(query)) {
      return pokemons?.results.slice(0, 10) ?? [];
    }

    const result = pokemons?.results.filter((pokemon) => pokemon.name.includes(query.toLowerCase()));
    return result ?? [];
  };

  const returnTypes = types?.results ?? [];

  return (
    <SearchContext.Provider value={{ search, isLoadingPokemons, types: returnTypes, isLoadingTypes }}>
      {children}
    </SearchContext.Provider>
  );
};
