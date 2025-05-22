import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { alpha } from '@mui/material/styles';

const LoginPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [accessType, setAccessType] = useState<'candidato' | 'comissao'>(
    'candidato'
  );

  const handleAccessChange = (
    event: React.MouseEvent<HTMLElement>,
    newAccessType: 'candidato' | 'comissao' | null
  ) => {
    if (newAccessType !== null) {
      setAccessType(newAccessType);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        p: 2,
        pt: 8,
        bgcolor: '#f0f4f8',
      }}
    >
      <Container maxWidth='sm'>
        <Paper
          elevation={isMobile ? 0 : 3}
          sx={{
            p: 4,
            bgcolor: '#fff',
            borderRadius: isMobile ? 0 : 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant='h5' component='h1' gutterBottom>
            {accessType === 'candidato'
              ? 'Acesso / Cadastro Candidato'
              : 'Acesso Comissão'}
          </Typography>

          <ToggleButtonGroup
            value={accessType}
            exclusive
            onChange={handleAccessChange}
            sx={{ mb: 3 }}
          >
            {['candidato', 'comissao'].map((type) => (
              <ToggleButton
                key={type}
                value={type}
                sx={{
                  textTransform: 'none',
                  px: 4,
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.primary.main}`,
                  color: 'primary.main',
                  '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: '#fff',
                  },
                  '&.Mui-selected:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                  },
                }}
              >
                {type === 'candidato' ? 'Candidato' : 'Comissão'}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <Typography variant='body1' gutterBottom>
            {accessType === 'candidato'
              ? 'Para se cadastrar ou acessar, preencha os dados abaixo.'
              : 'Acesso exclusivo para membros da comissão.'}
          </Typography>

          <Box
            component='form'
            noValidate
            autoComplete='off'
            sx={{ width: '100%' }}
          >
            {accessType === 'candidato' ? (
              <>
                <TextField
                  fullWidth
                  label='Nome'
                  margin='normal'
                  variant='outlined'
                />
                <TextField
                  fullWidth
                  label='Email'
                  margin='normal'
                  variant='outlined'
                  type='email'
                />
                <TextField
                  fullWidth
                  label='CPF'
                  margin='normal'
                  variant='outlined'
                />
              </>
            ) : (
              <>
                <TextField
                  fullWidth
                  label='Usuário da Comissão'
                  margin='normal'
                  variant='outlined'
                />
                <TextField
                  fullWidth
                  label='Senha'
                  margin='normal'
                  variant='outlined'
                  type='password'
                />
              </>
            )}
            <Button
              fullWidth
              variant='contained'
              color='primary'
              sx={{ mt: 2 }}
            >
              {accessType === 'candidato' ? 'Acessar' : 'Matrícula'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
