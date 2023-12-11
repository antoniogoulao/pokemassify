import { Stack, Typography } from '@mui/material';
import { useSearch } from '@tanstack/react-router';
import { TypeSearchParams } from '../types/router';
import { useGetTypeByName } from '../hooks/type';
import { Loading } from '../components/pokemon/Loading';
import { isNilOrEmpty } from '../helpers';
import { TypeNotFound } from '../components/type/TypeNotFound';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { colorType } from '../utils/colorType';
import { useGetPokemonTypes } from '../hooks/pokemonTypes';
import { PokemonAvatar } from '../components/pokemon/PokemonAvatar';
import { CombatProperties } from '../components/type/CombatProperties';
import { TypeProperty } from '../components/type/TypeProperty';

export const Types = () => {
  const search = useSearch({ from: '/type/' }) as TypeSearchParams;
  const { data, isLoading } = useGetTypeByName(search.name);
  const { data: types } = useGetPokemonTypes();
  const intl = useIntl();

  if (isLoading) {
    return <Loading message={intl.formatMessage({ id: 'load.type', defaultMessage: 'Loading Type' })} />;
  }

  if (isNilOrEmpty(data)) {
    return <TypeNotFound />;
  }

  return (
    <Stack
      spacing={2}
      sx={{
        mt: 2,
        padding: 2,
        minHeight: { xs: 0, lg: 'calc(100vh - 320px)' },
        backgroundColor: colorType(search.name, true),
      }}
    >
      <Stack spacing={1}>
        <Typography component="h1" variant="h4" textTransform="capitalize">
          {data.name} {intl.formatMessage({ id: 'label.labelType', defaultMessage: '(Type)' })}
        </Typography>
        <Typography>
          <FormattedMessage
            id="template.typeDescription"
            defaultMessage="The <b>{name} type</b> is one of the {total} types. There are at least {numberPokemons} pokémons of type {name} (counting those that are {name}-type in at least one of their forms)."
            values={{
              b: (chunks) => <b>{chunks}</b>,
              name: search.name.charAt(0).toUpperCase() + search.name.slice(1),
              total: types?.results.length ?? 20,
              numberPokemons: data.pokemon.length,
            }}
          />
        </Typography>
      </Stack>
      <CombatProperties
        label={
          <FormattedMessage
            id="label.offensiveProperties"
            defaultMessage="Offensive properties of {name} type moves"
            values={{
              name: search.name.charAt(0).toUpperCase() + search.name.slice(1),
            }}
          />
        }
      >
        <TypeProperty
          items={data.damage_relations.double_damage_to}
          label={<FormattedMessage id="label.superEffective" defaultMessage="Super effective (×2)" />}
        />
        <TypeProperty
          items={data.damage_relations.half_damage_to}
          label={<FormattedMessage id="label.notVeryEffective" defaultMessage="Not very effective (×½)" />}
        />
        <TypeProperty
          items={data.damage_relations.no_damage_to}
          label={<FormattedMessage id="label.notEffective" defaultMessage="No effect (×0)" />}
        />
      </CombatProperties>
      <CombatProperties
        label={
          <FormattedMessage
            id="label.defensiveProperties"
            defaultMessage="Defensive properties of {name} type Pokémons"
            values={{
              name: search.name.charAt(0).toUpperCase() + search.name.slice(1),
            }}
          />
        }
      >
        <TypeProperty
          items={data.damage_relations.double_damage_from}
          label={<FormattedMessage id="label.superWeak" defaultMessage="Weak to (×2)" />}
        />
        <TypeProperty
          items={data.damage_relations.half_damage_from}
          label={<FormattedMessage id="label.resists" defaultMessage="Resists (×½)" />}
        />
        <TypeProperty
          items={data.damage_relations.no_damage_from}
          label={<FormattedMessage id="label.immuneTo" defaultMessage="Immune to (×0)" />}
        />
      </CombatProperties>
      <Stack spacing={2}>
        <Typography component="h3" variant="h6" fontWeight="bold">
          <FormattedMessage
            id="label.Pokémons"
            defaultMessage="Pokémons"
            values={{
              name: search.name.charAt(0).toUpperCase() + search.name.slice(1),
            }}
          />
        </Typography>
        <Stack direction="row" gap={2} flexWrap="wrap" justifyContent="center">
          {data.pokemon.slice(0, 14).map(({ pokemon }) => (
            <PokemonAvatar key={pokemon.name} name={pokemon.name} />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
