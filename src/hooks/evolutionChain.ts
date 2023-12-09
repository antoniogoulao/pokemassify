import { useQuery } from '@tanstack/react-query';
import { getEvolutionChainById } from '../services/pokemon.api';
import { EvolutionChain } from '../types/evolution';
import { isNilOrEmpty } from '../helpers';

export const useGetEvolutionChainById = (id: string) =>
  useQuery({
    queryKey: ['getEvolutionChainById', id],
    queryFn: async () => {
      const resp = await getEvolutionChainById(id);
      return { ...resp, evolutions: flatten(resp.chain) };
    },
  });

const flatten = (chain: EvolutionChain) => {
  let flatChain = [chain.species];
  if (isNilOrEmpty(chain.evolves_to)) {
    return flatChain;
  }
  for (let evolution of chain.evolves_to) {
    if (Array.isArray(evolution.evolves_to) && !isNilOrEmpty(evolution.evolves_to)) {
      flatChain.push(...flatten(evolution));
    } else {
      flatChain.push(evolution.species);
    }
  }
  return flatChain;
};
