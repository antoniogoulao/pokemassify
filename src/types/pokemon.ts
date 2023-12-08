export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItemResponse[];
}

export interface PokemonListItemResponse {
  name: string;
  url: string;
}

export interface PokemonDetailsResponse {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Ability[];
  forms: Form[];
  game_indices: Index[];
  held_items: Item[];
  location_area_encounters: string;
  moves: Move[];
  species: {
    name: string;
    url: string;
  };
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  past_types: PastType[];
}

export interface Ability {
  ability: { name: string; url: string };
  is_hidden: boolean;
  slot: number;
}

export interface Sprites {
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: { name: string; url: string };
}

export interface Type {
  slot: number;
  type: { name: string; url: string };
}

export interface PastType {
  generation: { name: string; url: string };
  types: Type[];
}

export interface Form {
  name: string;
  url: string;
}

export interface Move {
  move: { name: string; url: string };
  version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  level_learned_at: number;
  version_group: { name: string; url: string };
  move_learn_method: { name: string; url: string };
}

export interface Index {
  game_index: number;
  version: { name: string; url: string };
}

export interface Item {
  item: { name: string; url: string };
  version_details: VersionDetail[];
}
export interface VersionDetail {
  rarity: number;
  version: { name: string; url: string };
}
