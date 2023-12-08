import {
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
import { SearchContext } from '../store/SearchContext';

export const TypeFilter = () => {
  const [type, setType] = useState('');
  const { isLoadingTypes, types } = useContext(SearchContext);

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Type</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={type}
        label="Type"
        onChange={handleChange}
        disabled={isLoadingTypes}
      >
        <MenuItem value="">
          <ListItem>
            <ListItemIcon>
              <img width={32} src={`/images/types/none_icon.png`} alt={'none'} />
            </ListItemIcon>
            <ListItemText sx={{ ml: 2 }}>
              <Typography textTransform="capitalize">None</Typography>
            </ListItemText>
          </ListItem>
        </MenuItem>
        {types.map((type) => (
          <MenuItem value={type.name}>
            <ListItem component="div">
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
