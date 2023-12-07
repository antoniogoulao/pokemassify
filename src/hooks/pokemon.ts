import { useInfiniteQuery } from '@tanstack/react-query';
import { getPokemons } from '../services/pokemon.api';

const PAGE_SIZE = 24;

export const useGetPokemons = (limit = PAGE_SIZE) =>
  useInfiniteQuery({
    queryKey: ['getPokemons'],
    queryFn: async ({ pageParam }) => getPokemons(pageParam, limit),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => (lastPage.next ? lastPageParam + PAGE_SIZE : undefined),
  });
