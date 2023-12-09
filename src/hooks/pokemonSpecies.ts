import { useQuery } from '@tanstack/react-query';
import { getPokemonSpeciesByName } from '../services/pokemon.api';

export const useGetPokemonSpeciesByName = (name: string) =>
  useQuery({
    queryKey: ['getPokemonSpeciesByName', name],
    queryFn: async () => getPokemonSpeciesByName(name),
    enabled: !!name,
  });
