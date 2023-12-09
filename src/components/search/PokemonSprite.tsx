import React, { SyntheticEvent } from 'react';
import { useGetPokemonByName } from '../../hooks/pokemon';
import { isNilOrEmpty } from '../../helpers';

export const PokemonSprite = ({ name }: { name: string }) => {
  const { data } = useGetPokemonByName(name);

  const addDefaultSrc = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    if (!isNilOrEmpty(data)) {
      (event.target as HTMLImageElement).src =
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
      return;
    }
    (event.target as HTMLImageElement).src = '/images/types/unknown_icon.png';
  };

  if (isNilOrEmpty(data)) {
    return null;
  }

  return (
    <>
      <img
        width={32}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${data.id}.gif`}
        alt={name}
        onError={addDefaultSrc}
      />
    </>
  );
};
