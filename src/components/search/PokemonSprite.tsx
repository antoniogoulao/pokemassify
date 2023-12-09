import React, { SyntheticEvent } from 'react';
import { useGetPokemonByName } from '../../hooks/pokemon';
import { isNilOrEmpty } from '../../helpers';

const addDefaultSrc = (event: SyntheticEvent<HTMLImageElement, Event>) => {
  (event.target as HTMLImageElement).src = '/images/types/unknown_icon.png';
};

export const PokemonSprite = ({ name }: { name: string }) => {
  const { data } = useGetPokemonByName(name);

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
