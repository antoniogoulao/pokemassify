import { axiosInstance } from './axios';
import { PokemonDetailsResponse, PokemonListResponse } from '../types/pokemon';
import { PokemonTypeListResponse } from '../types/pokemonTypes';
import { PokemonSpeciesResponse } from '../types/pokemonSpecies';
import { EvolutionChainResponse } from '../types/evolution';

export const getPokemons = async (offset?: number, limit?: number) => {
  const resp = await axiosInstance.get<PokemonListResponse>(`/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
  return resp.data;
};

export const getPokemonByName = async (name: string) => {
  const resp = await axiosInstance.get<PokemonDetailsResponse>(`/api/v2/pokemon/${name}`);
  return resp.data;
};

export const getPokemonById = async (id: string) => {
  const resp = await axiosInstance.get<PokemonDetailsResponse>(`/api/v2/pokemon/${id}`);
  return resp.data;
};

export const getPokemonTypes = async () => {
  const resp = await axiosInstance.get<PokemonTypeListResponse>('/api/v2/type');
  return resp.data;
};

export const getPokemonSpeciesByName = async (name: string) => {
  const resp = await axiosInstance.get<PokemonSpeciesResponse>(`/api/v2/pokemon-species/${name}`);
  return resp.data;
};

export const getEvolutionChainById = async (id: string) => {
  const resp = await axiosInstance.get<EvolutionChainResponse>(`/api/v2/evolution-chain/${id}`);
  return resp.data;
};
