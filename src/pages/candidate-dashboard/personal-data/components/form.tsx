import React from 'react';
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { initialCandidateProps } from '../types';
import brazilianStates from '../../../../utils/state-list';

interface PersonalDataFormProps {
  personalData: initialCandidateProps;
  handleChange: (field: keyof initialCandidateProps, value: string) => void;
}

const PersonalDataForm: React.FC<PersonalDataFormProps> = ({
  personalData,
  handleChange,
}) => {
  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Nome Social"
              value={personalData.social_name}
              onChange={(e) => handleChange('social_name', e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Nome de Registro"
              value={personalData.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="CPF"
              value={personalData.cpf}
              onChange={(e) => handleChange('cpf', e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Sexo Biológico</InputLabel>
              <Select
                value={personalData.sex}
                label="Sexo Biológico"
                onChange={(e) => handleChange('sex', e.target.value)}
              >
                <MenuItem value="Masculino">Masculino</MenuItem>
                <MenuItem value="Feminino">Feminino</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="RG"
              value={personalData.registration_}
              onChange={(e) => handleChange('registration_', e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Órgão Expedidor"
              value={personalData.registration_place}
              onChange={(e) =>
                handleChange('registration_place', e.target.value)
              }
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel>UF do RG</InputLabel>
              <Select
                value={personalData.registration_state}
                label="UF do RG"
                onChange={(e) =>
                  handleChange('registration_state', e.target.value)
                }
              >
                {brazilianStates.map((estado) => (
                  <MenuItem key={estado.sigla} value={estado.sigla}>
                    {estado.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="E-mail Principal"
              value={personalData.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="E-mail Secundário"
              value={personalData.other_email}
              onChange={(e) => handleChange('other_email', e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Telefone Celular"
              value={personalData.cell_phone}
              onChange={(e) => handleChange('cell_phone', e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Telefone Fixo"
              value={personalData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              fullWidth
              label="Logradouro"
              value={personalData.address}
              onChange={(e) => handleChange('address', e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Número"
              value={personalData.address_number}
              onChange={(e) => handleChange('address_number', e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Complemento"
              value={personalData.address_complement}
              onChange={(e) =>
                handleChange('address_complement', e.target.value)
              }
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Bairro"
              value={personalData.address_neighborhood}
              onChange={(e) =>
                handleChange('address_neighborhood', e.target.value)
              }
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Cidade"
              value={personalData.address_city}
              onChange={(e) => handleChange('address_city', e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth>
              <InputLabel>UF</InputLabel>
              <Select
                value={personalData.address_state}
                label="UF"
                onChange={(e) => handleChange('address_state', e.target.value)}
              >
                {brazilianStates.map((estado) => (
                  <MenuItem key={estado.sigla} value={estado.sigla}>
                    {estado.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="CEP"
              value={personalData.address_zipcode}
              onChange={(e) => handleChange('address_zipcode', e.target.value)}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Maior Titulação"
              value={personalData.education_level}
              onChange={(e) => handleChange('education_level', e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Curso de Graduação"
              value={personalData.graduation_course}
              onChange={(e) =>
                handleChange('graduation_course', e.target.value)
              }
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Ano da Graduação"
              value={personalData.graduation_year}
              onChange={(e) => handleChange('graduation_year', e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Instituição de Graduação"
              value={personalData.graduation_institution}
              onChange={(e) =>
                handleChange('graduation_institution', e.target.value)
              }
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Curso de Especialização"
              value={personalData.specialization_course}
              onChange={(e) =>
                handleChange('specialization_course', e.target.value)
              }
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Ano da Especialização"
              value={personalData.specialization_year}
              onChange={(e) =>
                handleChange('specialization_year', e.target.value)
              }
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Instituição da Especialização"
              value={personalData.specialization_institution}
              onChange={(e) =>
                handleChange('specialization_institution', e.target.value)
              }
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Link do Currículo Lattes"
              value={personalData.lattes_link}
              onChange={(e) => handleChange('lattes_link', e.target.value)}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PersonalDataForm;
