import React from 'react';
import { Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <Drawer
      variant='permanent'
      sx={{
        width: 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 250,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{ padding: 2 }}>
        <List>
          <ListItem
            // button
            component={Link}
            to='/dashboard'
          >
            <ListItemText primary='Dashboard' />
          </ListItem>
          <ListItem
            // button
            component={Link}
            to='/help'
          >
            <ListItemText primary='Ajuda' />
          </ListItem>
          <ListItem
            // button
            component={Link}
            to='/login'
          >
            <ListItemText primary='Login' />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
