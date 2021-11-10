import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
const Header = () => {
  return (
    <AppBar position="fixed">
      <Toolbar variant="dense">
        <Typography
          sx={{ flexGrow: 1 }}
          variant="h6"
          color="inherit"
          component="div"
        >
          Books Catalogue
        </Typography>
        <IconButton>
          <Icon sx={{ color: 'white' }}>add</Icon>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
