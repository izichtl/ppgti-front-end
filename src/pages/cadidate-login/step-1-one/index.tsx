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
              ? 'Faça sua inscrição'
              : 'Acesse a plataforma'}
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
                {type === 'candidato' ? 'Cadastrar' : 'Acessar'}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <Typography variant='body1' align='center' gutterBottom>
            {accessType === 'candidato'
              ? 'Preencha os campos para cadastrar sua inscrição, sua senha será o CPF combinado com Email.'
              : 'Caso tenha iniciado sua inscrição, acesse aqui.'}
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
                  label='Email'
                  name='email'
                  variant='outlined'
                  placeholder='seu-email@aqui.com'
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
                  fullWidth
                  label='CPF'
                  name='cpf'
                  type='text'
                  variant='outlined'
                  placeholder='111.222.333-44'
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
            )}

            <Button
              fullWidth
              variant='contained'
              color='primary'
              sx={{ mt: 2 }}
              onClick={handlerNextStep}
            >
              {accessType === 'candidato' ? 'Cadastrar' : 'Acessar'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default StepOne;
