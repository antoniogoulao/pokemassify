import { ListItem, Stack, Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import { DamageRelationItem } from '../../types/type';
import { useNavigate } from '@tanstack/react-router';

export const TypeProperty = ({ items, label }: { items: DamageRelationItem[]; label: ReactNode }) => {
  const navigate = useNavigate();
  return (
    <Stack spacing={1} pl={2}>
      <Typography fontWeight="bold">{label}</Typography>
      {items.map((item) => (
        <ListItem key={item.name} onClick={() => navigate({ to: '/type', search: { name: item.name } })}>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            <img width={24} src={`/images/types/${item.name}_icon.png`} alt={item.name} />
            <Typography>{item.name}</Typography>
          </Stack>
        </ListItem>
      ))}
    </Stack>
  );
};
