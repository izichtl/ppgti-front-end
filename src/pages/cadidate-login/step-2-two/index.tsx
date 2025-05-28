import { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Switch,
  Grid,
  useMediaQuery,
  useTheme,
  Paper,
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import brazilianStates from '../../../utils/state-list';
import { quotaOptionsPros } from '..';
import ScrollToTop from '../../../components/scroll-top';

const StepTwo = ({ handlerNextStep, useFormikProps, quotaOptions }: any) => {
  // const [selected, setSelected] = useState('');
  const [disabled, setDisabled] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleToggle = (value: string) => {
    // setSelected(value);
    useFormikProps.setFieldValue('quota', value);
  };

  useEffect(() => {
    const errors = useFormikProps.errors;
    if (Object.keys(errors).length === 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [useFormikProps]);

  return (
    <Box sx={{ bgcolor: '#f0f4f8', minHeight: '100vh', p: 2, pt: 8 }}>
      <Paper
        elevation={isMobile ? 0 : 3}
        sx={{
          maxWidth: 900,
          mx: 'auto',
          p: 4,
          borderRadius: isMobile ? 0 : 2,
          bgcolor: '#fff',
        }}
      >
        <ScrollToTop />
        <Typography variant='h5' align='center' gutterBottom>
          Dados Pessoais
        </Typography>
        <Typography
          variant='body2'
          align='center'
          color='text.secondary'
          gutterBottom
        >
          Preencha os campos abaixo para continuar seu cadastro.
        </Typography>

        <Grid container spacing={2}>
          {/* Coluna Esquerda */}
          <Grid item xs={12} md={6}>
            <TextField
              label='Nome de Registro'
              name='name'
              variant='outlined'
              fullWidth
              margin='normal'
              value={useFormikProps.values.name}
              onChange={useFormikProps.handleChange}
              error={
                !!useFormikProps.errors.name && !!useFormikProps.touched.name
              }
              helperText={useFormikProps.errors.name}
            />
            <TextField
              label='Registro Geral - RG'
              name='registration_'
              variant='outlined'
              fullWidth
              margin='normal'
              value={useFormikProps.values.registration_}
              onChange={useFormikProps.handleChange}
              error={
                !!useFormikProps.errors.registration_ &&
                !!useFormikProps.touched.registration_
              }
              helperText={useFormikProps.errors.registration_}
            />
            <TextField
              label='Orgão Expedidor'
              name='registration_place'
              variant='outlined'
              fullWidth
              margin='normal'
              value={useFormikProps.values.registration_place}
              onChange={useFormikProps.handleChange}
              error={
                !!useFormikProps.errors.registration_place &&
                !!useFormikProps.touched.registration_place
              }
              helperText={useFormikProps.errors.registration_place}
            />
            <FormControl fullWidth margin='normal'>
              <InputLabel>Estado</InputLabel>
              <Select
                name='address_state'
                value={useFormikProps.values.address_state}
                onChange={useFormikProps.handleChange}
                label='UF'
              >
                {brazilianStates.map((estado) => (
                  <MenuItem key={estado.sigla} value={estado.sigla}>
                    {estado.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label='Outro Email'
              name='other_email'
              variant='outlined'
              fullWidth
              margin='normal'
              value={useFormikProps.values.other_email}
              onChange={useFormikProps.handleChange}
              error={
                !!useFormikProps.errors.other_email &&
                !!useFormikProps.touched.other_email
              }
              helperText={useFormikProps.errors.other_email}
            />
            <FormControl fullWidth margin='normal'>
              <InputLabel>Sexo Biológico</InputLabel>
              <Select
                name='sex'
                value={useFormikProps.values.sex}
                onChange={useFormikProps.handleChange}
                label='Sexo Biológico'
              >
                <MenuItem value='Masculino'>Masculino</MenuItem>
                <MenuItem value='Feminino'>Feminino</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Coluna Direita */}
          <Grid item xs={12} md={6}>
            <TextField
              label='Endereço'
              name='address'
              variant='outlined'
              fullWidth
              margin='normal'
              value={useFormikProps.values.address}
              onChange={useFormikProps.handleChange}
              error={
                !!useFormikProps.errors.address &&
                !!useFormikProps.touched.address
              }
              helperText={useFormikProps.errors.address}
            />
            <TextField
              label='Número'
              name='address_number'
              variant='outlined'
              fullWidth
              margin='normal'
              value={useFormikProps.values.address_number}
              onChange={useFormikProps.handleChange}
              error={
                !!useFormikProps.errors.address_number &&
                !!useFormikProps.touched.address_number
              }
              helperText={useFormikProps.errors.address_number}
            />
            <TextField
              label='Complemento'
              name='address_complement'
              variant='outlined'
              fullWidth
              margin='normal'
              value={useFormikProps.values.address_complement}
              onChange={useFormikProps.handleChange}
              error={
                !!useFormikProps.errors.address_complement &&
                !!useFormikProps.touched.address_complement
              }
              helperText={useFormikProps.errors.address_complement}
            />
            <TextField
              label='Bairro'
              name='address_neighborhood'
              variant='outlined'
              fullWidth
              margin='normal'
              value={useFormikProps.values.address_neighborhood}
              onChange={useFormikProps.handleChange}
              error={
                !!useFormikProps.errors.address_neighborhood &&
                !!useFormikProps.touched.address_neighborhood
              }
              helperText={useFormikProps.errors.address_neighborhood}
            />
            <TextField
              label='Cidade'
              name='address_city'
              variant='outlined'
              fullWidth
              margin='normal'
              value={useFormikProps.values.address_city}
              onChange={useFormikProps.handleChange}
              error={
                !!useFormikProps.errors.address_city &&
                !!useFormikProps.touched.address_city
              }
              helperText={useFormikProps.errors.address_city}
            />
            <FormControl fullWidth margin='normal'>
              <InputLabel>UF</InputLabel>
              <Select
                name='registration_state'
                value={useFormikProps.values.registration_state}
                onChange={useFormikProps.handleChange}
                label='UF'
              >
                {brazilianStates.map((estado) => (
                  <MenuItem key={estado.sigla} value={estado.sigla}>
                    {estado.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label='CEP'
              name='address_zipcode'
              variant='outlined'
              fullWidth
              margin='normal'
              value={useFormikProps.values.address_zipcode}
              onChange={useFormikProps.handleChange}
              error={
                !!useFormikProps.errors.address_zipcode &&
                !!useFormikProps.touched.address_zipcode
              }
              helperText={useFormikProps.errors.address_zipcode}
            />
            <TextField
              label='Telefone Celular'
              name='cell_phone'
              variant='outlined'
              fullWidth
              margin='normal'
              value={useFormikProps.values.cell_phone}
              onChange={useFormikProps.handleChange}
              error={
                !!useFormikProps.errors.cell_phone &&
                !!useFormikProps.touched.cell_phone
              }
              helperText={useFormikProps.errors.cell_phone}
            />
            <TextField
              label='Telefone Fixo'
              name='phone'
              variant='outlined'
              fullWidth
              margin='normal'
              value={useFormikProps.values.phone}
              onChange={useFormikProps.handleChange}
              error={
                !!useFormikProps.errors.phone && !!useFormikProps.touched.phone
              }
              helperText={useFormikProps.errors.phone}
            />
          </Grid>

          <Grid item xs={12}>
            <Box p={2} border={1} borderRadius={2} borderColor='grey.400'>
              <Typography variant='h6' gutterBottom>
                Optante por Cota
              </Typography>
              {quotaOptions.map((option: quotaOptionsPros) => {
                return (
                  <FormControlLabel
                    key={option.value}
                    control={
                      <Switch
                        checked={useFormikProps.values.quota === option.value}
                        onChange={handleToggle.bind(null, option.value)}
                      />
                    }
                    label={option.label}
                  />
                );
              })}
            </Box>
          </Grid>
          <Grid item xs={12}>
            
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                mt: 4,
                gap: 2,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  flex: 1,
                  textAlign: { xs: 'center', sm: 'left' },
                  fontWeight: 500,
                    }}
                  >
                    Preencha todos os campos para avançar
              </Typography>

              <Button
                variant="contained"
                color="primary"
                disabled={disabled}
                size="large"
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderRadius: 2,
                  width: { xs: 'auto', sm: 'auto' },
                  ml: '25rem', // largura automática
                  }}
                onClick={handlerNextStep}
                >
                  Avançar
              </Button>
              
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default StepTwo;
