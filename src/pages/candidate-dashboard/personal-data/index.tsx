import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

import { useCandidate } from '../../../hooks/candidate-data';

import ScrollToTop from '../../../components/scroll-top';
import PersonalDataView from './components/view';
import PersonalDataForm from './components/form';

type PersonalDataType = {
  name: string;
  social_name: string;
  cpf: string;
  email: string;
  registration_: string;
  registration_place: string;
  registration_state: string;
  sex: string;
  address: string;
  address_number: string;
  address_complement?: string;
  address_neighborhood: string;
  address_city: string;
  address_state: string;
  address_zipcode: string;
  other_email?: string;
  phone?: string | null;
  cell_phone: string;
  education_level?: string;
  graduation_course?: string;
  graduation_year?: string;
  graduation_institution?: string;
  specialization_course?: string;
  specialization_year?: string;
  specialization_institution?: string;
  lattes_link?: string;
};

const PersonalData = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { data, mutate } = useCandidate();
  const [personalData, setPersonalData] = useState<PersonalDataType | null>(
    null,
  );

  useEffect(() => {
    if (data) {
      setPersonalData(data as PersonalDataType);
    }
  }, [data]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    await mutate();
    setIsEditing(false);
  };

  const handleCancel = () => {
    setPersonalData(data as PersonalDataType);
    setIsEditing(false);
  };

  return (
    <Box
      sx={{
        width: { xs: '100%', md: '80%' },
        minHeight: '100vh',
        mx: 'auto',
        p: { xs: 2, md: 4 },
        pt: 8,
      }}
    >
      <ScrollToTop />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          Dados Pessoais
        </Typography>
        {!isEditing ? (
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleEdit}
          >
            Editar
          </Button>
        ) : (
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<CancelIcon />}
              onClick={handleCancel}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              form="personal-data-form"
              type="submit"
            >
              Salvar
            </Button>
          </Stack>
        )}
      </Box>

      <Paper
        elevation={2}
        sx={{
          p: 3,
          borderRadius: 2,
          mt: 3,
        }}
      >
        {isEditing && personalData ? (
          <PersonalDataForm
            personalData={personalData}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : personalData ? (
          <PersonalDataView personalData={personalData} />
        ) : null}
      </Paper>
    </Box>
  );
};

export default PersonalData;
