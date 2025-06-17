import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

import { useAuth } from '../../../hooks/auth';

import ScrollToTop from '../../../components/scroll-top';
import PersonalDataView from './components/view';
import PersonalDataForm from './components/form';

import { initialCandidateProps } from './types';

const PersonalData = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { getUserFromToken } = useAuth();
  const user = getUserFromToken();
  const [personalData, setPersonalData] = useState<initialCandidateProps>(
    user as initialCandidateProps,
  );

  useEffect(() => {
    if (user) {
      setPersonalData(user as initialCandidateProps);
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setPersonalData(user as initialCandidateProps);
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
        {isEditing ? (
          <PersonalDataForm
            personalData={personalData}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        ) : (
          <PersonalDataView personalData={personalData} />
        )}
      </Paper>
    </Box>
  );
};

export default PersonalData;
