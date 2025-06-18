import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  Alert,
  CircularProgress,
  Paper,
  Fab,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';
import { useGetSelectionProcesses } from '../../hooks/selection-processes';
import { useAuth } from '../../hooks/auth';
import SelectionProcessForm from './selection-process-form';

interface SelectionProcess {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  application_deadline: string;
  result_date: string;
  documents_required: string[];
  evaluation_criteria: string;
  contact_info: string;
  status: 'draft' | 'published' | 'closed';
  created_at: string;
  updated_at: string;
  program: string;
  year: string;
  semester: string;
}

const ComissaoDashboardPage: React.FC = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();
  const { getUserFromToken, logout } = useAuth();

  const userInfo = getUserFromToken();
  const { useGetSelectionProcessesFetcher } = useGetSelectionProcesses();

  const { data, error, isLoading, mutate } = useSWR(
    `selection-processes-${refreshKey}`,
    useGetSelectionProcessesFetcher,
    {
      refreshInterval: 30000, // Refresh every 30 seconds
    },
  );

  const selectionProcesses: SelectionProcess[] = data?.data?.data || [];

  const handleFormClose = () => {
    setFormOpen(false);
  };

  const handleFormSuccess = () => {
    setRefreshKey((prev) => prev + 1);
    mutate(); // Force refresh
  };

  const handleLogout = () => {
    logout();
    navigate('/comissao/login');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'default';
      case 'published':
        return 'success';
      case 'closed':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft':
        return 'Rascunho';
      case 'published':
        return 'Publicado';
      case 'closed':
        return 'Fechado';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Handle authentication errors from API calls
  useEffect(() => {
    if (error?.response?.status === 401) {
      console.error('Error:', error);
    }
  }, [error]);

  return (
    <Box>
      {/* Header with user info and logout */}
      <AppBar position="static" sx={{ mb: 3 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Painel da Comissão
          </Typography>
          {userInfo && (
            <Typography variant="body2" sx={{ mr: 2 }}>
              Olá, {userInfo.name} ({userInfo.matricula})
            </Typography>
          )}
          <IconButton color="inherit" onClick={handleLogout} title="Sair">
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Processos Seletivos
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setFormOpen(true)}
            size="large"
          >
            Novo Processo Seletivo
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            Erro ao carregar processos seletivos. Tente novamente.
            {error.response?.status === 401 && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Sua sessão expirou. Redirecionando para login...
              </Typography>
            )}
          </Alert>
        )}

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : selectionProcesses.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Nenhum processo seletivo encontrado
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Crie seu primeiro processo seletivo para começar a gerenciar
              candidatos.
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setFormOpen(true)}
            >
              Criar Processo Seletivo
            </Button>
          </Paper>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              },
              gap: 3,
            }}
          >
            {selectionProcesses.map((process) => (
              <Card
                key={process.id}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{ flexGrow: 1, mr: 1 }}
                    >
                      {process.title}
                    </Typography>
                    <Chip
                      label={getStatusLabel(process.status)}
                      color={getStatusColor(process.status) as any}
                      size="small"
                    />
                  </Box>

                  {/* Program, Year and Semester Info */}
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip
                        label={process.program}
                        variant="outlined"
                        size="small"
                        color="primary"
                      />
                      <Chip
                        label={`${process.year}/${process.semester}`}
                        variant="outlined"
                        size="small"
                        color="secondary"
                      />
                    </Box>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {process.description.length > 100
                      ? `${process.description.substring(0, 100)}...`
                      : process.description}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      component="div"
                    >
                      <strong>Início:</strong> {formatDate(process.start_date)}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      component="div"
                    >
                      <strong>Fim:</strong> {formatDate(process.end_date)}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      component="div"
                    >
                      <strong>Prazo de Inscrição:</strong>{' '}
                      {formatDate(process.application_deadline)}
                    </Typography>
                  </Box>

                  {process.documents_required &&
                    process.documents_required.length > 0 && (
                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          component="div"
                          sx={{ mb: 1 }}
                        >
                          <strong>Documentos Obrigatórios:</strong>
                        </Typography>
                        <Box
                          sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}
                        >
                          {process.documents_required
                            .slice(0, 3)
                            .map((doc, index) => (
                              <Chip
                                key={index}
                                label={doc}
                                size="small"
                                variant="outlined"
                              />
                            ))}
                          {process.documents_required.length > 3 && (
                            <Chip
                              label={`+${
                                process.documents_required.length - 3
                              } mais`}
                              size="small"
                              variant="outlined"
                            />
                          )}
                        </Box>
                      </Box>
                    )}
                </CardContent>

                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => {
                      // TODO: Implement edit functionality
                      console.log('Edit process:', process.id);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      // TODO: Implement delete functionality
                      console.log('Delete process:', process.id);
                    }}
                  >
                    Excluir
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        )}

        <SelectionProcessForm
          open={formOpen}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      </Box>
    </Box>
  );
};

export default ComissaoDashboardPage;
