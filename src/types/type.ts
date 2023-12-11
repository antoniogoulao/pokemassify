import { PokemonListItemResponse } from './pokemon';

export interface TypeDetailsResponse {
  id: number;
  name: string;
  damage_relations: DamageRelation;
  pokemon: { pokemon: PokemonListItemResponse }[];
  moves: { name: string; url: string }[];
}

export interface DamageRelation {
  no_damage_to: DamageRelationItem[];
  half_damage_to: DamageRelationItem[];
  double_damage_to: DamageRelationItem[];
  no_damage_from: DamageRelationItem[];
  half_damage_from: DamageRelationItem[];
  double_damage_from: DamageRelationItem[];
}

export interface DamageRelationItem {
  name: string;
  url: string;
}
