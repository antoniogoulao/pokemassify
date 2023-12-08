export interface PokemonTypeListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonTypeListItemResponse[];
}

export interface PokemonTypeListItemResponse {
  name: string;
  url: string;
}
