import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Sitemark from '../r-icon/index'; // Mantido
// Removido import do ColorModeIconDropdown, já que está causando o quadrado vazio.

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  backdropFilter: 'blur(24px)',
  borderBottom: `2px solid ${theme.palette.primary.main}`,
  borderRadius: 0,
  padding: '8px 12px',
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position='fixed'
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth='lg'>
        <StyledToolbar variant='dense' disableGutters>
          <Box
            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}
          >
            <Sitemark />
            <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 4 }}>
              <Button variant='text' color='info' size='small'>
                Inscrições
              </Button>
              <Button variant='text' color='info' size='small'>
                Editais
              </Button>
              <Button variant='text' color='info' size='small'>
                Sobre
              </Button>
              <Button variant='text' color='info' size='small'>
                Contato
              </Button>
              <Button variant='text' color='info' size='small'>
                Área do Candidato
              </Button>
            </Box>
          </Box>

          {/* Ações Desktop */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Button color='primary' variant='text' size='small'>
              Entrar
            </Button>
            <Button color='primary' variant='contained' size='small'>
              Cadastrar-se
            </Button>
            {/* ColorModeIconDropdown removido daqui */}
          </Box>

          {/* Ações Mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            {/* Opcional: Se quiser manter o seletor de tema apenas no mobile, adicione aqui */}
            <IconButton aria-label='Menu button' onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Drawer Mobile Menu */}
          <Drawer
            anchor='top'
            open={open}
            onClose={toggleDrawer(false)}
            PaperProps={{
              sx: { top: 'var(--template-frame-height, 0px)' },
            }}
          >
            <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={toggleDrawer(false)}>
                  <CloseRoundedIcon />
                </IconButton>
              </Box>
              <MenuItem>Inscrições</MenuItem>
              <MenuItem>Editais</MenuItem>
              <MenuItem>Sobre</MenuItem>
              <MenuItem>Contato</MenuItem>
              <MenuItem>Área do Candidato</MenuItem>
              <Divider sx={{ my: 3 }} />
              <MenuItem>
                <Button color='primary' variant='contained' fullWidth>
                  Cadastrar-se
                </Button>
              </MenuItem>
              <MenuItem>
                <Button color='primary' variant='outlined' fullWidth>
                  Entrar
                </Button>
              </MenuItem>
            </Box>
          </Drawer>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
