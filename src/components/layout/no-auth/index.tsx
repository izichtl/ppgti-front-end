import React from 'react';
import { Box } from '@mui/material';
// import Header from '../../header';
import { Outlet } from 'react-router-dom';

const NoAuthLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {/* <Header /> */}
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default NoAuthLayout;
