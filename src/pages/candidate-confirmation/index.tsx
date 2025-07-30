import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  useMediaQuery,
  useTheme,
  Stack,
  Divider,
  Chip,
  Grid,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import DescriptionIcon from '@mui/icons-material/Description';
import { filePrefixes } from '../../utils/files-hash-mapper';

const quotaLabels = {
  nao_optante: 'Não Optante',
  afro_ou_inde: 'Afrodescendente ou Indígena',
  pcd: 'Pessoa com Deficiência',
  servidor_if: 'Servidor permanente do IFPB',
};

const formatReadableDate = (dateString: string): string => {
  const date = new Date(dateString);
  const months = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} de ${month} ${year}`;
};

const CandidateConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Get data from location state
  const applicationType = location.state?.applicationType;
  const candidateData = location.state?.candidateData;
  const applicationData = location.state?.applicationData;
  const uploadedFiles = location.state?.uploadedFiles;

  const handleGoToDashboard = () => {
    navigate('/candidate/dashboard');
  };

  // Check if we have any data to display
  if (!candidateData && !applicationData) {
    // If no data available, redirect to dashboard
    navigate('/candidate/dashboard');
    return null;
  }

  // Filter uploaded documents based on candidate's profile
  const getVisibleDocuments = () => {
    if (!candidateData) return [];

    return filePrefixes.filter((doc) => {
      if (doc.control === '') return true;
      if (doc.control === candidateData.sex) return true;
      if (doc.control === candidateData.quota) return true;
      return false;
    });
  };

  const visibleDocuments = getVisibleDocuments();

  return (
    <Box sx={{ bgcolor: '#f0f4f8', minHeight: '100vh', p: 2, pt: 8 }}>
      <Paper
        elevation={isMobile ? 0 : 3}
        sx={{
          maxWidth: 840,
          mx: 'auto',
          p: 4,
          borderRadius: isMobile ? 0 : 2,
          bgcolor: '#fff',
        }}
      >
        {/* Header with success icon */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <CheckCircleIcon
            sx={{
              fontSize: 80,
              color: 'success.main',
              mb: 2,
            }}
          />
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {applicationType === 'process'
              ? 'Inscrição no Processo Seletivo Realizada com Sucesso!'
              : 'Cadastro Realizado com Sucesso!'}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {applicationType === 'process'
              ? 'Sua inscrição foi registrada e você pode acompanhar o status pelo dashboard.'
              : 'Seus dados foram salvos e você já pode se candidatar aos processos seletivos disponíveis.'}
          </Typography>
        </Box>
        <Divider sx={{ mb: 4 }} />
        {/* Application Information Section - only for process applications */}
        {applicationType === 'process' && applicationData && (
          <>
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" fontWeight="bold">
                  Detalhes da Inscrição
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="body2" color="text.secondary">
                    Processo Seletivo
                  </Typography>
                  <Typography variant="h6" fontWeight="medium" gutterBottom>
                    {applicationData.process?.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {applicationData.process?.description}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Linha de Pesquisa
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {applicationData.research_line?.name}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Tema de Pesquisa
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {applicationData.research_topic?.name}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Typography variant="body2" color="text.secondary">
                    Título do Projeto
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {applicationData.project_title}
                  </Typography>
                </Grid>

                {applicationData.project_file_name && (
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="body2" color="text.secondary">
                      Arquivo do Projeto
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {applicationData.project_file_name}
                    </Typography>
                  </Grid>
                )}

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Período
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {applicationData.process?.year}.
                    {applicationData.process?.semester}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Prazo de Inscrição
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {applicationData.process?.application_deadline
                      ? formatReadableDate(
                          applicationData.process.application_deadline,
                        )
                      : 'Não informado'}
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ mb: 4 }} />
          </>
        )}
        {/* Personal Information Section - only for candidate registration */}
        {candidateData && (
          <>
            <Box sx={{ mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" fontWeight="bold">
                  Informações Pessoais
                </Typography>
              </Box>

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Nome Completo
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {candidateData.name}
                  </Typography>
                </Grid>

                {candidateData.social_name && (
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Nome Social
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {candidateData.social_name}
                    </Typography>
                  </Grid>
                )}

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {candidateData.email}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    CPF
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {candidateData.cpf}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Telefone Celular
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {candidateData.cell_phone}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Modalidade de Cota
                  </Typography>
                  <Chip
                    label={
                      quotaLabels[candidateData.quota] || candidateData.quota
                    }
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {/* Address Information */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Endereço
              </Typography>
              <Typography variant="body1">
                {candidateData.address}, {candidateData.address_number}
                {candidateData.address_complement &&
                  `, ${candidateData.address_complement}`}
              </Typography>
              <Typography variant="body1">
                {candidateData.address_neighborhood} -{' '}
                {candidateData.address_city}/{candidateData.address_state}
              </Typography>
              <Typography variant="body1">
                CEP: {candidateData.address_zipcode}
              </Typography>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {/* Academic Information Section */}
            {(candidateData.education_level ||
              candidateData.graduation_course) && (
              <>
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6" fontWeight="bold">
                      Informações Acadêmicas
                    </Typography>
                  </Box>

                  <Grid container spacing={2}>
                    {candidateData.graduation_course && (
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="body2" color="text.secondary">
                          Curso de Graduação
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {candidateData.graduation_course}
                        </Typography>
                      </Grid>
                    )}

                    {candidateData.graduation_institution && (
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="body2" color="text.secondary">
                          Instituição
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {candidateData.graduation_institution}
                        </Typography>
                      </Grid>
                    )}

                    {candidateData.graduation_year && (
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="body2" color="text.secondary">
                          Ano de Conclusão
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {candidateData.graduation_year}
                        </Typography>
                      </Grid>
                    )}

                    {candidateData.specialization_course && (
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="body2" color="text.secondary">
                          Especialização
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {candidateData.specialization_course}
                        </Typography>
                      </Grid>
                    )}

                    {candidateData.lattes_link && (
                      <Grid size={{ xs: 12 }}>
                        <Typography variant="body2" color="text.secondary">
                          Currículo Lattes
                        </Typography>
                        <Typography
                          variant="body1"
                          fontWeight="medium"
                          sx={{
                            wordBreak: 'break-all',
                            color: 'primary.main',
                            textDecoration: 'underline',
                          }}
                        >
                          {candidateData.lattes_link}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Box>

                <Divider sx={{ mb: 4 }} />
              </>
            )}

            {/* Documents Section - only for candidate registration */}
            {uploadedFiles && (
              <>
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <DescriptionIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6" fontWeight="bold">
                      Documentos Enviados
                    </Typography>
                  </Box>

                  <Stack spacing={2}>
                    {visibleDocuments.map((doc) => {
                      const isUploaded =
                        uploadedFiles && uploadedFiles[doc.id] !== null;
                      return (
                        <Box
                          key={doc.id}
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            p: 2,
                            border: '1px solid',
                            borderColor: isUploaded
                              ? 'success.light'
                              : 'grey.300',
                            borderRadius: 1,
                            bgcolor: isUploaded ? 'success.50' : 'grey.50',
                          }}
                        >
                          <Typography variant="body2">{doc.label}</Typography>
                          <Chip
                            label={isUploaded ? 'Enviado' : 'Não enviado'}
                            color={isUploaded ? 'success' : 'default'}
                            size="small"
                          />
                        </Box>
                      );
                    })}
                  </Stack>
                </Box>

                <Divider sx={{ mb: 4 }} />
              </>
            )}
          </>
        )}{' '}
        {/* End of candidateData conditional block */}
        {/* Next Steps Information */}
        <Box sx={{ mb: 4, p: 3, bgcolor: 'info.50', borderRadius: 2 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Próximos Passos
          </Typography>
          {applicationType === 'process' ? (
            <>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                • Aguarde o resultado da seleção
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                • Acompanhe o status da sua inscrição pelo dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Fique atento aos prazos e comunicações oficiais
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                • Acesse o dashboard para visualizar os processos seletivos
                disponíveis
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                • Faça sua inscrição nos processos de interesse
              </Typography>
              <Typography variant="body2" color="text.secondary">
                • Acompanhe o status das suas inscrições pelo dashboard
              </Typography>
            </>
          )}
        </Box>
        {/* Action Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleGoToDashboard}
            sx={{
              px: 6,
              py: 1.5,
              fontSize: '1.1rem',
              borderRadius: 2,
            }}
          >
            Ir para Dashboard
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CandidateConfirmation;
