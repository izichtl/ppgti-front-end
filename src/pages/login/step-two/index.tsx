import { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Switch,
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import brazilianStates from '../../../utils/state-list';

const StepTwo = ({ handlerNextStep, useFormikProps }: any) => {
  const [selected, setSelected] = useState('');

  const options = [
    { label: 'Não Optante', value: 'nao_optante' },
    { label: 'Afrodescendente ou Indígena', value: 'afro_ou_inde' },
    { label: 'Pessoa com Deficiência', value: 'pcd' },
    { label: 'Servidor permanente do IFPB', value: 'servidor' },
  ];

  const handleToggle = (value: string) => {
    setSelected(selected === value ? '' : value);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'white',
        padding: 1,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          padding: 4,
          backgroundColor: '#eeeeee',
          borderRadius: 2,
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant='h5' align='center' gutterBottom>
          Dados pessoais
        </Typography>
        <Typography
          variant='body2'
          align='center'
          color='textSecondary'
          gutterBottom
        >
          Para continuar seu cadastro, preencha os campos abaixo.
        </Typography>
        <TextField
          label='Nome Social'
          name='social_name'
          variant='outlined'
          placeholder='Como gostaria de ser chamado?'
          fullWidth
          value={useFormikProps.values.social_name}
          onChange={(e) => useFormikProps.handleChange(e)}
          error={
            useFormikProps.errors.social_name !== undefined &&
            useFormikProps.touched.social_name
          }
          helperText={useFormikProps.errors.social_name}
        />
        <TextField
          label='Registro Geral - RG'
          variant='outlined'
          name='registration_'
          placeholder='22.222.222-2'
          fullWidth
          value={useFormikProps.values.registration_}
          onChange={(e) => useFormikProps.handleChange(e)}
          error={
            useFormikProps.errors.registration_ !== undefined &&
            useFormikProps.touched.registration_
          }
          helperText={useFormikProps.errors.registration_}
        />
        <TextField
          label='Orgão Expedidor'
          variant='outlined'
          name='registration_place'
          placeholder='22.222.222-2'
          fullWidth
          value={useFormikProps.values.registration_place}
          onChange={(e) => useFormikProps.handleChange(e)}
          error={
            useFormikProps.errors.registration_place !== undefined &&
            useFormikProps.touched.registration_place
          }
          helperText={useFormikProps.errors.registration_place}
        />
        <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id='demo-simple-select-label'>UF</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            value={useFormikProps.values.registration_state}
            label='UF'
            name='registration_state'
            onChange={(e) => {
              useFormikProps.handleChange(e);
            }}
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
          placeholder='outro-email@aqui.com'
          fullWidth
          value={useFormikProps.values.other_email}
          onChange={(e) => useFormikProps.handleChange(e)}
          error={
            useFormikProps.errors.other_email !== undefined &&
            useFormikProps.touched.other_email
          }
          helperText={useFormikProps.errors.other_email}
        />
        <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id='demo-simple-select-label'>Sexo Biológico</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            value={useFormikProps.values.sex}
            label='UF'
            name='sex'
            onChange={(e) => {
              useFormikProps.handleChange(e);
            }}
          >
            <MenuItem value={'Masculino'}>Masculino</MenuItem>
            <MenuItem value={'Feminino'}>Feminino</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label='Endereço'
          variant='outlined'
          fullWidth
          name='address'
          placeholder='Rua...'
          value={useFormikProps.values.address}
          onChange={(e) => useFormikProps.handleChange(e)}
          error={
            useFormikProps.errors.address !== undefined &&
            useFormikProps.touched.address
          }
          helperText={useFormikProps.errors.address}
        />
        <TextField
          label='Número'
          variant='outlined'
          fullWidth
          name='address_number'
          placeholder='01'
          value={useFormikProps.values.address_number}
          onChange={(e) => useFormikProps.handleChange(e)}
          error={
            useFormikProps.errors.address_number !== undefined &&
            useFormikProps.touched.address_number
          }
          helperText={useFormikProps.errors.address_number}
        />
        <TextField
          label='Complemento'
          variant='outlined'
          fullWidth
          name='address_complement'
          placeholder='Próximo ao ...'
          value={useFormikProps.values.address_complement}
          onChange={(e) => useFormikProps.handleChange(e)}
          error={
            useFormikProps.errors.address_complement !== undefined &&
            useFormikProps.touched.address_complement
          }
          helperText={useFormikProps.errors.address_complement}
        />
        <TextField
          label='Bairro'
          variant='outlined'
          fullWidth
          name='address_neighborhood'
          placeholder='Próximo ao ...'
          value={useFormikProps.values.address_neighborhood}
          onChange={(e) => useFormikProps.handleChange(e)}
          error={
            useFormikProps.errors.address_neighborhood !== undefined &&
            useFormikProps.touched.address_neighborhood
          }
          helperText={useFormikProps.errors.address_neighborhood}
        />
        <TextField
          label='Cidade'
          variant='outlined'
          fullWidth
          name='address_city'
          placeholder='Próximo ao ...'
          value={useFormikProps.values.address_city}
          onChange={(e) => useFormikProps.handleChange(e)}
          error={
            useFormikProps.errors.address_city !== undefined &&
            useFormikProps.touched.address_city
          }
          helperText={useFormikProps.errors.address_city}
        />
        <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id='demo-simple-select-label'>UF</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            value={useFormikProps.values.registration_state}
            label='UF'
            name='registration_state'
            onChange={(e) => {
              useFormikProps.handleChange(e);
            }}
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
          variant='outlined'
          fullWidth
          name='address_zipcode'
          placeholder='Próximo ao ...'
          value={useFormikProps.values.address_zipcode}
          onChange={(e) => useFormikProps.handleChange(e)}
          error={
            useFormikProps.errors.address_zipcode !== undefined &&
            useFormikProps.touched.address_zipcode
          }
          helperText={useFormikProps.errors.address_zipcode}
        />
        <TextField
          label='Telefone Celular'
          variant='outlined'
          fullWidth
          name='cell_phone'
          placeholder='Próximo ao ...'
          value={useFormikProps.values.cell_phone}
          onChange={(e) => useFormikProps.handleChange(e)}
          error={
            useFormikProps.errors.cell_phone !== undefined &&
            useFormikProps.touched.cell_phone
          }
          helperText={useFormikProps.errors.cell_phone}
        />
        <TextField
          label='Telefone Fixo'
          variant='outlined'
          fullWidth
          name='phone'
          placeholder='Próximo ao ...'
          value={useFormikProps.values.phone}
          onChange={(e) => useFormikProps.handleChange(e)}
          error={
            useFormikProps.errors.phone !== undefined &&
            useFormikProps.touched.phone
          }
          helperText={useFormikProps.errors.phone}
        />
        <Box p={2} border={1} borderRadius={2} borderColor='grey.400'>
          <Typography variant='h6' gutterBottom>
            Optante por cota
          </Typography>
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              control={
                <Switch
                  checked={selected === option.value}
                  onChange={() => handleToggle(option.value)}
                />
              }
              label={option.label}
            />
          ))}
        </Box>
        <Button
          variant='contained'
          color='primary'
          fullWidth
          onClick={handlerNextStep}
        >
          Cadastrar
        </Button>
      </Box>
    </Box>
  );
};

export default StepTwo;
