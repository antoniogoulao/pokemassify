import { useGetEvolutionChainById } from '../hooks/evolutionChain';
import { Skeleton, Stack } from '@mui/material';
import { ArrowForwardIos } from '@mui/icons-material';
import { isNilOrEmpty } from '../helpers';
import { PokemonAvatar } from './PokemonAvatar';

export const EvolutionChain = ({ evolutionChainId, name }: { evolutionChainId: string; name: string }) => {
  const { data, isLoading } = useGetEvolutionChainById(evolutionChainId);

  if (isLoading) {
    return <Skeleton width={1000} height={200} />;
  }

  if (isNilOrEmpty(data)) {
    return null;
  }

  return (
    <Stack
      direction="row"
      divider={<ArrowForwardIos sx={{ color: 'white', height: 30 }} />}
      spacing={2}
      alignItems="center"
    >
      {data.evolutions.map((evolution) => (
        <PokemonAvatar key={evolution.name} name={evolution.name} selected={evolution.name === name} />
      ))}
    </Stack>
  );
};
