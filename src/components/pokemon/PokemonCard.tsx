import { Box, Card, CardActionArea, CardContent, CardMedia, Skeleton, Stack, Typography } from '@mui/material';
import { useGetPokemonByName } from '../../hooks/pokemon';
import { isNilOrEmpty } from '../../helpers';
import { useNavigate } from '@tanstack/react-router';
import { colorType } from '../../utils/colorType';
import React from 'react';

export const PokemonCard = ({ name }: { name: string }) => {
  const { data, isFetching } = useGetPokemonByName(name);
  const navigate = useNavigate();

  if (isFetching) {
    return (
      <Card
        raised
        sx={{
          margin: 1,
          maxWidth: 220,
        }}
      >
        <Stack gap={1} px={1} alignItems="center">
          <Stack direction="row" mt={1} justifyContent="space-between" width="100%">
            <Skeleton variant="rectangular" width={20} height={20} />
            <Skeleton variant="rectangular" width={40} height={20} />
          </Stack>
          <Skeleton variant="rounded" width={150} height={140} />
          <Skeleton variant="text" width={100} sx={{ fontSize: '1rem', mb: 1 }} />
        </Stack>
      </Card>
    );
  }

  if (isNilOrEmpty(data)) {
    return null;
  }

  return (
    <Card
      raised
      sx={{
        margin: 1,
        background: `linear-gradient(to right bottom, ${colorType(data.types[0].type.name)}, ${colorType(
          data.types[1]?.type.name,
        )})`,
        maxWidth: 220,
      }}
    >
      <CardActionArea
        onClick={() => {
          navigate({ to: '/pokemon', search: { name } });
        }}
      >
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
            sx={{ objectFit: 'contain' }}
          />
          <Box flex={1} display="flex" justifyContent="center">
            <Typography component="h1" textTransform="capitalize" fontWeight="bold" justifyContent="center">
              {data.name}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
