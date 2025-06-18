import React from 'react';
import { Typography, Grid, Divider } from '@mui/material';
import { PersonalDataFormValues } from './types';
import { getQuotaLabel } from '../../../../utils/quota';

interface PersonalDataViewProps {
  personalData: PersonalDataFormValues;
}

const PersonalDataView: React.FC<PersonalDataViewProps> = ({
  personalData,
}) => {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Informações Básicas
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body1">
              <strong>Nome Social:</strong> {personalData.social_name}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body1">
              <strong>Nome de Registro:</strong> {personalData.name}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body1">
              <strong>CPF:</strong> {personalData.cpf}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body1">
              <strong>Sexo Biológico:</strong> {personalData.sex}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body1">
              <strong>RG:</strong> {personalData.registration_}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body1">
              <strong>Órgão Expedidor:</strong>{' '}
              {personalData.registration_place}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body1">
              <strong>UF do RG:</strong> {personalData.registration_state}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body1">
              <strong>Cota:</strong> {getQuotaLabel(personalData.quota_id)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Contato
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body1">
              <strong>E-mail Principal:</strong> {personalData.email}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body1">
              <strong>E-mail Secundário:</strong> {personalData.other_email}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body1">
              <strong>Telefone Celular:</strong> {personalData.cell_phone}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body1">
              <strong>Telefone Fixo:</strong> {personalData.phone}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Endereço
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body1">
              <strong>Logradouro:</strong> {personalData.address}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="body1">
              <strong>Número:</strong> {personalData.address_number}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <Typography variant="body1">
              <strong>Complemento:</strong> {personalData.address_complement}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body1">
              <strong>Bairro:</strong> {personalData.address_neighborhood}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body1">
              <strong>Cidade:</strong> {personalData.address_city}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body1">
              <strong>UF:</strong> {personalData.address_state}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body1">
              <strong>CEP:</strong> {personalData.address_zipcode}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Formação Acadêmica
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body1">
              <strong>Maior Titulação:</strong> {personalData.education_level}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body1">
              <strong>Curso de Graduação:</strong>{' '}
              {personalData.graduation_course}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body1">
              <strong>Ano da Graduação:</strong> {personalData.graduation_year}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body1">
              <strong>Instituição de Graduação:</strong>{' '}
              {personalData.graduation_institution}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body1">
              <strong>Curso de Especialização:</strong>{' '}
              {personalData.specialization_course}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body1">
              <strong>Ano da Especialização:</strong>{' '}
              {personalData.specialization_year}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body1">
              <strong>Instituição da Especialização:</strong>{' '}
              {personalData.specialization_institution}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="body1">
              <strong>Link do Currículo Lattes:</strong>{' '}
              {personalData.lattes_link}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PersonalDataView;
