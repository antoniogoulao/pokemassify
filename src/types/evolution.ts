export interface EvolutionChainResponse {
  id: number;
  chain: EvolutionChain;
}

export interface EvolutionChain {
  is_baby: boolean;
  species: { name: string; url: string };
  evolves_to: EvolutionChain[];
}
