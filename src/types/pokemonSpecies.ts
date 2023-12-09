export interface PokemonSpeciesResponse {
  id: number;
  name: string;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  evolution_chain: { url: string };
  flavor_text_entries: FlavorTextEntry[];
  genera: Genera[];
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
}

export interface Genera {
  genus: string;
  language: {
    name: string;
    url: string;
  };
}
