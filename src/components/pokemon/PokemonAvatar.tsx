import { useGetPokemonByName } from '../../hooks/pokemon';
import { Avatar, Paper, Skeleton } from '@mui/material';
import { isNilOrEmpty } from '../../helpers';
import { useNavigate } from '@tanstack/react-router';

export const PokemonAvatar = ({ name, selected = false }: { name: string; selected?: boolean }) => {
  const { data, isLoading } = useGetPokemonByName(name);
  const navigate = useNavigate();

  if (isLoading) {
    return <Skeleton variant="rounded" width={70} height={70} />;
  }

  if (isNilOrEmpty(data)) {
    return null;
  }

  return (
    <Avatar
      onClick={() => navigate({ to: '/pokemon', search: { name } })}
      component={Paper}
      elevation={2}
      alt={name}
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
      sx={{
        width: 70,
        height: 70,
        p: 1,
        ...(selected && {
          boxShadow:
            '    0 0 10px 10px #fff,' +
            '    0 0 10px 10px #FFD700, /* middle magenta */\n' +
            '    0 0 20px 10px #665600; /* outer cyan */',
        }),
      }}
    />
  );
};
