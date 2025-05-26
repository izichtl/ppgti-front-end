import React, { useEffect, useState } from 'react';
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
import { IMaskInput } from 'react-imask';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask='000.000.000-00'
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

const StepOne = ({ handlerNextStep, useFormikProps }: any) => {
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
          <Typography variant='h5' align='center' gutterBottom>
            {accessType === 'candidato'
              ? 'Cadastro de Candidato'
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

          <Typography variant='body1' align='center' gutterBottom>
            {accessType === 'candidato'
              ? 'Preencha os campos abaixo para começar seu cadastro ou retomar.'
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
                  label='Nome Social'
                  name='social_name'
                  variant='outlined'
                  placeholder='Nome social'
                  fullWidth
                  margin='normal'
                  value={useFormikProps.values.social_name}
                  onChange={useFormikProps.handleChange}
                  error={
                    Boolean(useFormikProps.errors.social_name) &&
                    Boolean(useFormikProps.touched.social_name)
                  }
                  helperText={useFormikProps.errors.social_name}
                />
                <TextField
                  label='Email'
                  name='email'
                  variant='outlined'
                  placeholder='seu-email@aqui.com'
                  type='email'
                  fullWidth
                  margin='normal'
                  value={useFormikProps.values.email}
                  onChange={useFormikProps.handleChange}
                  error={
                    Boolean(useFormikProps.errors.email) &&
                    Boolean(useFormikProps.touched.email)
                  }
                  helperText={useFormikProps.errors.email}
                />
                <TextField
                  label='CPF'
                  name='cpf'
                  variant='outlined'
                  placeholder='111.222.333-44'
                  fullWidth
                  margin='normal'
                  value={useFormikProps.values.cpf}
                  onChange={useFormikProps.handleChange}
                  error={
                    Boolean(useFormikProps.errors.cpf) &&
                    Boolean(useFormikProps.touched.cpf)
                  }
                  helperText={useFormikProps.errors.cpf}
                  InputProps={{
                    inputComponent: TextMaskCustom as any,
                  }}
                />
              </>
            ) : (
              <>
                <TextField
                  fullWidth
                  label='Usuário da Comissão'
                  name='userComissao' // Name para você ajustar depois
                  variant='outlined'
                  margin='normal'
                  value={useFormikProps.values.userComissao}
                  onChange={useFormikProps.handleChange}
                  error={
                    Boolean(useFormikProps.errors.userComissao) &&
                    Boolean(useFormikProps.touched.userComissao)
                  }
                  helperText={useFormikProps.errors.userComissao}
                />
                <TextField
                  fullWidth
                  label='Senha'
                  name='senhaComissao' // Name para você ajustar depois
                  type='password'
                  variant='outlined'
                  margin='normal'
                  value={useFormikProps.values.senhaComissao}
                  onChange={useFormikProps.handleChange}
                  error={
                    Boolean(useFormikProps.errors.senhaComissao) &&
                    Boolean(useFormikProps.touched.senhaComissao)
                  }
                  helperText={useFormikProps.errors.senhaComissao}
                />
              </>
            )}

            <Button
              fullWidth
              variant='contained'
              color='primary'
              sx={{ mt: 2 }}
              onClick={handlerNextStep}
            >
              {accessType === 'candidato' ? 'Cadastrar' : 'Matrícula'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default StepOne;
