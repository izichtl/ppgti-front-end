import { useState, useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import { Box, Typography, Paper, Button, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

import { useAuth } from '../../../hooks/auth';
import { useCandidateUpdate } from '../../../hooks/candidate-data';

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

  const { useCandidateUpdateFetcher } = useCandidateUpdate(
    {
      email: personalData.email,
      cpf: personalData.cpf,
      name: personalData.name,
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

  useEffect(() => {
    if (user) {
      setPersonalData(user as initialCandidateProps);
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await triggerUpdate();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating personal data:', error);
    }
  };

  const handleCancel = () => {
    setPersonalData(user as initialCandidateProps);
    setIsEditing(false);
  };

  const handleChange = (field: keyof initialCandidateProps, value: string) => {
    setPersonalData((prev) => ({
      ...prev,
      [field]: value,
    }));
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
              onClick={handleSave}
              disabled={isMutating}
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
            handleChange={handleChange}
          />
        ) : (
          <PersonalDataView personalData={personalData} />
        )}
      </Paper>
    </Box>
  );
};

export default PersonalData;
