import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from './r-components/AppNavbar';
import Header from './r-components/Header';
import SideMenu from './r-components/SideMenu';
import { Outlet } from 'react-router-dom';

export default function InnerLayout(props: { disableCustomTheme?: boolean }) {
  return (
    <>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        <Box
          component='main'
          sx={(theme) => ({
            flexGrow: 1,
            // backgroundColor: theme.vars
            //   ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
            //   : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <Outlet />
          </Stack>
        </Box>
      </Box>
    </>
  );
}
