import {
  Button,
  FormControl,
  InputLabel,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { SearchContext } from '../../store/SearchContext';
import { FormattedMessage } from 'react-intl';
import { ArrowForwardIos } from '@mui/icons-material';
import { useNavigate } from '@tanstack/react-router';

export const TypeFilter = () => {
  const [type, setType] = useState('');
  const { isLoadingTypes, types } = useContext(SearchContext);
  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  const handleClickDetails = (name: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    navigate({ to: '/type', search: { name } });
  };

  return (
    <FormControl sx={{ mt: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">
        <FormattedMessage id="label.type" defaultMessage="Type" />
      </InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={type}
        label="Type"
        onChange={handleChange}
        disabled={isLoadingTypes}
        sx={{ backgroundColor: 'white' }}
      >
        <MenuItem value="">
          <ListItem component="div">
            <ListItemIcon>
              <img width={32} src={`/images/types/none_icon.png`} alt={'none'} />
            </ListItemIcon>
            <ListItemText sx={{ ml: 2 }}>
              <Typography textTransform="capitalize">
                <FormattedMessage id="label.none" defaultMessage="None" />
              </Typography>
            </ListItemText>
          </ListItem>
        </MenuItem>
        {types.map((type) => (
          <MenuItem key={type.name} value={type.name}>
            <ListItem
              component="div"
              secondaryAction={
                <Button
                  variant="contained"
                  onClick={handleClickDetails(type.name)}
                  endIcon={<ArrowForwardIos />}
                  sx={{ textTransform: 'none' }}
                >
                  <Typography>
                    <FormattedMessage id="label.details" defaultMessage="Details" />
                  </Typography>
                </Button>
              }
            >
              <ListItemIcon>
                <img width={32} src={`/images/types/${type.name}_icon.png`} alt={type.name} />
              </ListItemIcon>
              <ListItemText sx={{ ml: 2 }}>
                <Typography textTransform="capitalize">{type.name}</Typography>
              </ListItemText>
            </ListItem>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
