import React from 'react';
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

const DashboardCandidato = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentDateTime = new Date().toLocaleString('pt-BR');

  const handleCardClick = (nome: string) => {
    alert(`Você clicou em: ${nome}`);
  };

  return (
    <Box
      sx={{
        // bgcolor: '#ffffff',
        width: { xs: '100%', md: '80%' },
        minHeight: '100vh',
        mx: 'auto',
        p: { xs: 2, md: 4 },
        pt: 8,
      }}
    >
      <ScrollToTop />

      {/* Cabeçalho com título e data/hora */}
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

      {/* Processos Seletivos Abertos */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Processos Seletivos Abertos
      </Typography>
      <Stack spacing={2} mb={4}>
        {[
          {
            programa: 'Mestrado em Educação',
            nome: 'Seleção Mestrado 2025.1',
            inicio: '10/03/2025',
            fim: '30/04/2025',
            periodo: '2025.1',
            statusColor: '#4CAF50',
          },
          {
            programa: 'Mestrado em Ciências',
            nome: 'Processo Ciências 2025',
            inicio: '15/03/2025',
            fim: '15/05/2025',
            periodo: '2025.1',
            statusColor: '#FF9800',
          },
        ].map((item, index) => (
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
            onClick={() => handleCardClick(item.nome)}
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
            <Button variant="contained" sx={{ mt: 2 }}>
              Inscrever
            </Button>
          </Paper>
        ))}
      </Stack>

      {/* Suas Inscrições */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Suas Inscrições
      </Typography>
      <Stack spacing={2}>
        {[
          {
            programa: 'Mestrado em Educação',
            periodo: '2025.1',
            linha: 'Educação, Cultura e Sociedade',
            tema: 'Práticas Pedagógicas',
            titulo: 'Educação Inclusiva e Ensino Público',
            data: '01/04/2025',
          },
          {
            programa: 'Mestrado em Ciências',
            periodo: '2025.1',
            linha: 'Pesquisa Científica Aplicada',
            tema: 'Tecnologia e Sociedade',
            titulo: 'Aplicações de IA na Educação',
            data: '04/04/2025',
          },
        ].map((item, index) => (
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
            onClick={() => handleCardClick(item.titulo)}
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
            <Button variant="contained" sx={{ mt: 2 }}>
              Visualizar
            </Button>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default DashboardCandidato;
