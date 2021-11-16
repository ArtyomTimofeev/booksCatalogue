import React from 'react';
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

const GroupingSelect = ({ groupingType, setGroupingType }) => {
  const handleChange = (event) => {
    setGroupingType(event.target.value);
  };

  return (
    <Box sx={{ float: 'right' }}>
      <FormControl sx={{ minWidth: 240 }}>
        <InputLabel id="simple-select-label">Grouping</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={groupingType}
          label="Grouping"
          onChange={handleChange}
        >
          <MenuItem value={'year'}>By year</MenuItem>
          <MenuItem value={'rating'}>By rating</MenuItem>
          <MenuItem value={'author'}>By author</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
export default GroupingSelect;
