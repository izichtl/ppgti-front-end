import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Stack,
  useMediaQuery,
  useTheme,
  Grid,
} from '@mui/material';
import ScrollToTop from '../../components/scroll-top';
import { useBoolean } from '../../hooks/use-boolean';
import CadastroFormModal, {
  DadosFormulario,
} from '../../components/process-register-modal';

const processosAbertos = [
  {
    programa: 'PPGTI - IFPB',
    nome: 'Seleção PPGTI 2025.1',
    inicio: '10/03/2025',
    fim: '30/04/2025',
    periodo: '2025.1',
    statusColor: '#4CAF50',
  },
];

const suasInscricoes = [
  {
    programa: 'PPGTI - IFPB',
    periodo: '2025.1',
    linha: 'Ciência de Dados e Inteligência Artificial',
    tema: 'Mineração de Dados',
    titulo: 'Aplicações de Data Mining em Saúde Pública',
    data: '01/04/2025',
  },
  {
    programa: 'PPGTI - IFPB',
    periodo: '2025.1',
    linha: 'Redes e Sistemas Distribuídos',
    tema: 'IoT',
    titulo: 'Monitoramento Ambiental com Dispositivos IoT',
    data: '04/04/2025',
  },
];

const DashboardCandidato = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentDateTime = new Date().toLocaleString('pt-BR');

  const modal = useBoolean();
  const [dadosIniciais, setDadosIniciais] = useState<
    DadosFormulario | undefined
  >();

  useEffect(() => {
    if (dadosIniciais) {
      modal.onTrue();
    }
  }, [dadosIniciais]);

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

      <Grid container spacing={2} alignItems="center" mb={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" fontWeight="bold">
            Processos Seletivos
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            variant="h6"
            color="text.secondary"
            textAlign={isMobile ? 'left' : 'right'}
          >
            {currentDateTime}
          </Typography>
        </Grid>
      </Grid>

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Processos Seletivos Abertos
      </Typography>
      <Stack spacing={2} mb={4}>
        {processosAbertos.map((item, index) => (
          <Paper
            key={index}
            elevation={2}
            sx={{
              p: 2,
              borderLeft: `6px solid ${item.statusColor}`,
              borderRadius: 2,
              cursor: 'pointer',
              transition: '0.2s',
              width: '100%',
              '&:hover': { boxShadow: 6 },
            }}
          >
            <Typography variant="body1">
              <strong>Programa:</strong> {item.programa}
            </Typography>
            <Typography variant="body1">
              <strong>Nome:</strong> {item.nome}
            </Typography>
            <Typography variant="body1">
              <strong>Data Início:</strong> {item.inicio}
            </Typography>
            <Typography variant="body1">
              <strong>Data Fim:</strong> {item.fim}
            </Typography>
            <Typography variant="body1">
              <strong>Ano/Semestre:</strong> {item.periodo}
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => {
                setDadosIniciais(undefined);
                modal.onTrue();
              }}
            >
              Inscrever
            </Button>
          </Paper>
        ))}
      </Stack>

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Suas Inscrições
      </Typography>
      <Stack spacing={2}>
        {suasInscricoes.map((item, index) => (
          <Paper
            key={index}
            elevation={2}
            sx={{
              p: 2,
              borderLeft: '6px solid #4CAF50',
              borderRadius: 2,
              cursor: 'pointer',
              transition: '0.2s',
              width: '100%',
              '&:hover': { boxShadow: 6 },
            }}
          >
            <Typography variant="body1">
              <strong>Programa:</strong> {item.programa}
            </Typography>
            <Typography variant="body1">
              <strong>Ano/Semestre:</strong> {item.periodo}
            </Typography>
            <Typography variant="body1">
              <strong>Linha:</strong> {item.linha}
            </Typography>
            <Typography variant="body1">
              <strong>Tema:</strong> {item.tema}
            </Typography>
            <Typography variant="body1">
              <strong>Título do Pré-Projeto:</strong> {item.titulo}
            </Typography>
            <Typography variant="body1">
              <strong>Data da Inscrição:</strong> {item.data}
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => {
                setDadosIniciais({
                  linha: item.linha,
                  tema: item.tema,
                  titulo: item.titulo,
                });
              }}
            >
              Visualizar
            </Button>
          </Paper>
        ))}
      </Stack>

      <CadastroFormModal
        open={modal.value}
        onClose={modal.onFalse}
        dadosIniciais={dadosIniciais}
      />
    </Box>
  );
};

export default DashboardCandidato;
