import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
const Header = ({ setOpenForm }) => {
  const handleClickOpen = () => {
    setOpenForm(true);
  };
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar variant="dense">
        <Typography
          sx={{ flexGrow: 1 }}
          variant="h6"
          color="inherit"
          component="div"
        >
          Books Catalogue
        </Typography>
        <IconButton onClick={handleClickOpen}>
          <AddIcon sx={{ color: 'white' }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
