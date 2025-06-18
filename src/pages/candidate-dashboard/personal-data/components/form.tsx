import React, { useState } from 'react';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import * as Yup from 'yup';
import { FormikProps, useFormik } from 'formik';
import useSWRMutation from 'swr/mutation';
import { mutate } from 'swr';
import brazilianStates from '../../../../utils/state-list';
import { useCandidateUpdate } from '../../../../hooks/candidate-data';
import { PersonalDataFormValues } from './types';
import { getQuotaLabel, getQuotaValue } from '../../../../utils/quota';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Nome de registro é obrigatório'),
  social_name: Yup.string().required('Nome social é obrigatório'),
  cpf: Yup.string().required('CPF é obrigatório'),
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  registration_: Yup.string().required('RG é obrigatório'),
  registration_place: Yup.string().required('Órgão expedidor é obrigatório'),
  registration_state: Yup.string().required('UF do RG é obrigatória'),
  sex: Yup.string().required('Sexo biológico é obrigatório'),
  address: Yup.string().required('Endereço é obrigatório'),
  address_number: Yup.string().required('Número é obrigatório'),
  address_complement: Yup.string(),
  address_neighborhood: Yup.string().required('Bairro é obrigatório'),
  address_city: Yup.string().required('Cidade é obrigatória'),
  address_state: Yup.string().required('UF é obrigatória'),
  address_zipcode: Yup.string().required('CEP é obrigatório'),
  other_email: Yup.string().email('Email inválido'),
  phone: Yup.string().optional().nullable(),
  cell_phone: Yup.string().required('Telefone celular é obrigatório'),
  education_level: Yup.string(),
  graduation_course: Yup.string(),
  graduation_year: Yup.string(),
  graduation_institution: Yup.string(),
  specialization_course: Yup.string(),
  specialization_year: Yup.string(),
  specialization_institution: Yup.string(),
  lattes_link: Yup.string().url('URL inválida'),
  quota: Yup.string(),
  quota_id: Yup.number(),
});

interface PersonalDataFormProps {
  personalData: PersonalDataFormValues;
  onSave: () => void;
  onCancel: () => void;
}

const PersonalDataForm: React.FC<PersonalDataFormProps> = ({
  personalData,
  onSave,
  onCancel,
}) => {
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const formik: FormikProps<PersonalDataFormValues> = useFormik({
    initialValues: personalData,
    validationSchema,
    onSubmit: async (values) => {
      try {
        await triggerUpdate();
        await mutate('candidate-data');
        setSnackbar({
          open: true,
          message: 'Dados pessoais atualizados com sucesso!',
          severity: 'success',
        });
        setTimeout(() => {
          onSave();
        }, 1000);
      } catch (error) {
        console.error('Error updating personal data:', error);
        setSnackbar({
          open: true,
          message: 'Erro ao atualizar dados pessoais. Tente novamente.',
          severity: 'error',
        });
      }
    },
    enableReinitialize: true,
  });

  const { useCandidateUpdateFetcher } = useCandidateUpdate(
    {
      ...formik.values,
      quota: getQuotaValue(formik.values.quota_id),
    },
    'stepTwo',
  );

  const { trigger: triggerUpdate, isMutating } = useSWRMutation(
    'useCandidateUpdateFetcher',
    useCandidateUpdateFetcher,
    {
      revalidate: false,
    },
  );

  return (
    <>
      <form id="personal-data-form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Informações Pessoais
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Nome Social"
                  name="social_name"
                  value={formik.values.social_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.social_name &&
                    Boolean(formik.errors.social_name)
                  }
                  helperText={
                    formik.touched.social_name && formik.errors.social_name
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Nome de Registro"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="CPF"
                  name="cpf"
                  value={formik.values.cpf}
                  disabled
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl
                  fullWidth
                  error={formik.touched.sex && Boolean(formik.errors.sex)}
                >
                  <InputLabel>Sexo Biológico</InputLabel>
                  <Select
                    name="sex"
                    value={formik.values.sex}
                    label="Sexo Biológico"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value="Masculino">Masculino</MenuItem>
                    <MenuItem value="Feminino">Feminino</MenuItem>
                  </Select>
                  {formik.touched.sex && formik.errors.sex && (
                    <Typography color="error" variant="caption">
                      {formik.errors.sex}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Registro Geral - RG"
                  name="registration_"
                  value={formik.values.registration_}
                  disabled
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Órgão Expedidor"
                  name="registration_place"
                  value={formik.values.registration_place}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.registration_place &&
                    Boolean(formik.errors.registration_place)
                  }
                  helperText={
                    formik.touched.registration_place &&
                    formik.errors.registration_place
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl
                  fullWidth
                  error={
                    formik.touched.registration_state &&
                    Boolean(formik.errors.registration_state)
                  }
                >
                  <InputLabel>UF do RG</InputLabel>
                  <Select
                    name="registration_state"
                    value={formik.values.registration_state}
                    label="UF do RG"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {brazilianStates.map((estado) => (
                      <MenuItem key={estado.sigla} value={estado.sigla}>
                        {estado.nome}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.registration_state &&
                    formik.errors.registration_state && (
                      <Typography color="error" variant="caption">
                        {formik.errors.registration_state}
                      </Typography>
                    )}
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Cota"
                  name="quota"
                  value={getQuotaLabel(formik.values.quota_id)}
                  disabled
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Contato
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="E-mail Principal"
                  name="email"
                  value={formik.values.email}
                  disabled
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="E-mail Secundário"
                  name="other_email"
                  value={formik.values.other_email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.other_email &&
                    Boolean(formik.errors.other_email)
                  }
                  helperText={
                    formik.touched.other_email && formik.errors.other_email
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Telefone Celular"
                  name="cell_phone"
                  value={formik.values.cell_phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.cell_phone &&
                    Boolean(formik.errors.cell_phone)
                  }
                  helperText={
                    formik.touched.cell_phone && formik.errors.cell_phone
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Telefone Fixo"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Endereço
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 8 }}>
                <TextField
                  fullWidth
                  label="Logradouro"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  fullWidth
                  label="Número"
                  name="address_number"
                  value={formik.values.address_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.address_number &&
                    Boolean(formik.errors.address_number)
                  }
                  helperText={
                    formik.touched.address_number &&
                    formik.errors.address_number
                  }
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Complemento"
                  name="address_complement"
                  value={formik.values.address_complement}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.address_complement &&
                    Boolean(formik.errors.address_complement)
                  }
                  helperText={
                    formik.touched.address_complement &&
                    formik.errors.address_complement
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Bairro"
                  name="address_neighborhood"
                  value={formik.values.address_neighborhood}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.address_neighborhood &&
                    Boolean(formik.errors.address_neighborhood)
                  }
                  helperText={
                    formik.touched.address_neighborhood &&
                    formik.errors.address_neighborhood
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Cidade"
                  name="address_city"
                  value={formik.values.address_city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.address_city &&
                    Boolean(formik.errors.address_city)
                  }
                  helperText={
                    formik.touched.address_city && formik.errors.address_city
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl
                  fullWidth
                  error={
                    formik.touched.address_state &&
                    Boolean(formik.errors.address_state)
                  }
                >
                  <InputLabel>UF</InputLabel>
                  <Select
                    name="address_state"
                    value={formik.values.address_state}
                    label="UF"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {brazilianStates.map((estado) => (
                      <MenuItem key={estado.sigla} value={estado.sigla}>
                        {estado.nome}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.address_state &&
                    formik.errors.address_state && (
                      <Typography color="error" variant="caption">
                        {formik.errors.address_state}
                      </Typography>
                    )}
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="CEP"
                  name="address_zipcode"
                  value={formik.values.address_zipcode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.address_zipcode &&
                    Boolean(formik.errors.address_zipcode)
                  }
                  helperText={
                    formik.touched.address_zipcode &&
                    formik.errors.address_zipcode
                  }
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Dados Acadêmicos
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Maior Titulação"
                  name="education_level"
                  value={formik.values.education_level}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.education_level &&
                    Boolean(formik.errors.education_level)
                  }
                  helperText={
                    formik.touched.education_level &&
                    formik.errors.education_level
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Curso de Graduação"
                  name="graduation_course"
                  value={formik.values.graduation_course}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.graduation_course &&
                    Boolean(formik.errors.graduation_course)
                  }
                  helperText={
                    formik.touched.graduation_course &&
                    formik.errors.graduation_course
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Ano da Graduação"
                  name="graduation_year"
                  value={formik.values.graduation_year}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.graduation_year &&
                    Boolean(formik.errors.graduation_year)
                  }
                  helperText={
                    formik.touched.graduation_year &&
                    formik.errors.graduation_year
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Instituição de Graduação"
                  name="graduation_institution"
                  value={formik.values.graduation_institution}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.graduation_institution &&
                    Boolean(formik.errors.graduation_institution)
                  }
                  helperText={
                    formik.touched.graduation_institution &&
                    formik.errors.graduation_institution
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Curso de Especialização"
                  name="specialization_course"
                  value={formik.values.specialization_course}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.specialization_course &&
                    Boolean(formik.errors.specialization_course)
                  }
                  helperText={
                    formik.touched.specialization_course &&
                    formik.errors.specialization_course
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Ano da Especialização"
                  name="specialization_year"
                  value={formik.values.specialization_year}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.specialization_year &&
                    Boolean(formik.errors.specialization_year)
                  }
                  helperText={
                    formik.touched.specialization_year &&
                    formik.errors.specialization_year
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Instituição da Especialização"
                  name="specialization_institution"
                  value={formik.values.specialization_institution}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.specialization_institution &&
                    Boolean(formik.errors.specialization_institution)
                  }
                  helperText={
                    formik.touched.specialization_institution &&
                    formik.errors.specialization_institution
                  }
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Link do Currículo Lattes"
                  name="lattes_link"
                  value={formik.values.lattes_link}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lattes_link &&
                    Boolean(formik.errors.lattes_link)
                  }
                  helperText={
                    formik.touched.lattes_link && formik.errors.lattes_link
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PersonalDataForm;
