import { useQuery } from '@tanstack/react-query';
import { getPokemonTypes } from '../services/pokemon.api';

export const useGetPokemonTypes = () =>
  useQuery({ queryKey: ['useGetPokemonTypes'], queryFn: async () => getPokemonTypes() });
