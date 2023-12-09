import { Box, Card, CardActionArea, CardContent, CardMedia, Skeleton, Stack, Typography } from '@mui/material';
import { useGetPokemonByName } from '../../hooks/pokemon';
import { isNilOrEmpty } from '../../helpers';
import { Link } from '@tanstack/react-router';
import { colorType } from '../../utils/colorType';
import React from 'react';

export const PokemonCard = ({ name }: { name: string }) => {
  const { data, isFetching } = useGetPokemonByName(name);

  if (isFetching) {
    <Skeleton width={100} height={200} />;
  }

  if (isNilOrEmpty(data)) {
    return null;
  }

  return (
    <Link to={`/pokemon`} search={{ name }}>
      <Card
        sx={{
          margin: 1,
          background: `linear-gradient(to right bottom, ${colorType(data.types[0].type.name)}, ${colorType(
            data.types[1]?.type.name,
          )})`,
          textDecoration: 'none',
        }}
      >
        <CardActionArea>
          <CardContent>
            <Stack direction="row" justifyContent="space-between">
              <Typography component="h2">#{data.id}</Typography>
              <Stack>
                {data.types.map((type) => (
                  <React.Fragment key={type.type.name}>
                    <img width={32} src={`/images/types/${type.type.name}.png`} alt={type.type.name} />
                  </React.Fragment>
                ))}
              </Stack>
            </Stack>
            <CardMedia
              component="img"
              height="140"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
              alt={data.name}
            />
            <Box flex={1} display="flex" justifyContent="center">
              <Typography component="h1" textTransform="capitalize" fontWeight="bold" justifyContent="center">
                {data.name}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};
