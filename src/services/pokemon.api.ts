import { axiosInstance } from './axios';
import { PokemonListResponse } from '../types/pokemon';

export const getPokemons = async (offset?: number, limit?: number) => {
  const resp = await axiosInstance.get<PokemonListResponse>(`/pokemon/?offset=${offset}&limit=${limit}`);
  return resp.data;
};
