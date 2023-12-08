import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getPokemonById, getPokemonByName, getPokemons } from '../services/pokemon.api';

const PAGE_SIZE = 24;

export const useGetPokemons = (limit = PAGE_SIZE) =>
  useInfiniteQuery({
    queryKey: ['useGetPokemonList'],
    queryFn: async ({ pageParam }) => getPokemons(pageParam, limit),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => (lastPage.next ? lastPageParam + PAGE_SIZE : undefined),
  });

export const useGetPokemonList = () =>
  useQuery({
    queryKey: ['useGetPokemonListWithOffset'],
    queryFn: async () => {
      const { count } = await getPokemons(0, 1);
      return await getPokemons(0, count);
    },
  });

export const useGetPokemonByName = (name: string) =>
  useQuery({ queryKey: ['getPokemonByName', name], queryFn: async () => getPokemonByName(name), enabled: !!name });

export const useGetPokemonById = (id: string) =>
  useQuery({ queryKey: ['getPokemonById', id], queryFn: async () => getPokemonById(id), enabled: !!id });
