import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { CancelRounded, CheckBox, ExpandMore } from '@mui/icons-material';
import { FormattedMessage } from 'react-intl';
import { useSearch } from '@tanstack/react-router';
import { useGetPokemonSpeciesByName } from '../../hooks/pokemonSpecies';
import { isNilOrEmpty } from '../../helpers';
import { PokemonSearchParams } from '../../types/router';

export const PokemonDetails = () => {
  const search = useSearch({ from: '/pokemon/' }) as PokemonSearchParams;
  const { data } = useGetPokemonSpeciesByName(search.name);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (_: React.SyntheticEvent) => {
    setExpanded(!expanded);
  };

  if (isNilOrEmpty(data)) {
    return null;
  }

  return (
    <Accordion
      elevation={0}
      expanded={expanded}
      onChange={handleChange}
      sx={{
        background: 'none',
        ':before': {
          display: 'none',
        },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMore />} sx={{ pl: 0 }}>
        <Typography sx={{ flexShrink: 0 }} component="h2" variant="h5">
          <FormattedMessage id="label.details" defaultMessage="Details" />
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0 }}>
        <Stack direction="row" gap={2} sx={{ justifyContent: { xs: 'center', sm: 'start' } }}>
          <Stack alignItems="center">
            <Typography variant="h6">
              <FormattedMessage id="label.baby" defaultMessage="Baby" />
            </Typography>
            {data.is_baby ? <CheckBox color="success" /> : <CancelRounded color="error" />}
          </Stack>
          <Stack alignItems="center">
            <Typography variant="h6">
              <FormattedMessage id="label.legendary" defaultMessage="Legendary" />
            </Typography>
            <Typography>
              {data.is_legendary ? <CheckBox color="success" /> : <CancelRounded color="error" />}
            </Typography>
          </Stack>
          <Stack alignItems="center">
            <Typography variant="h6">
              <FormattedMessage id="label.mythical" defaultMessage="Mythical" />
            </Typography>
            <Typography>{data.is_mythical ? <CheckBox color="success" /> : <CancelRounded color="error" />}</Typography>
          </Stack>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
