import { useGetPokemonByName } from '../../hooks/pokemon';
import { Avatar, Paper, Skeleton } from '@mui/material';
import { isNilOrEmpty } from '../../helpers';
import { Link } from '@tanstack/react-router';

export const PokemonAvatar = ({ name, selected = false }: { name: string; selected?: boolean }) => {
  const { data, isLoading } = useGetPokemonByName(name);

  if (isLoading) {
    return <Skeleton />;
  }

  if (isNilOrEmpty(data)) {
    return null;
  }

  return (
    <Link to={`/pokemon`} search={{ name }}>
      <Avatar
        component={Paper}
        elevation={2}
        alt={name}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
        sx={{
          width: 70,
          height: 70,
          ...(selected && {
            boxShadow:
              '    0 0 10px 10px #fff,' +
              '    0 0 10px 10px #FFD700, /* middle magenta */\n' +
              '    0 0 20px 10px #665600; /* outer cyan */',
          }),
        }}
      />
    </Link>
  );
};
