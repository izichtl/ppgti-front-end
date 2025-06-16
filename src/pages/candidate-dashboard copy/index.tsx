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
import { useGetSelectionProcesses } from '../../hooks/get-processes';
import SelectionProcessCard from '../../components/card-processes';
import { useStatusColor } from '../../hooks/use-status-color';

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

const CandidateHomolog = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentDateTime = new Date().toLocaleString('pt-BR');
  const [researshLines, setResearhLines] = useState([]);
  const [selectionsProcesses, setSelectionProcesses] = useState([]);
  const getStatusColor = useStatusColor();
  const { processes, processesLoading, processesError } =
    useGetSelectionProcesses();

  const modal = useBoolean();
  const [dadosIniciais, setDadosIniciais] = useState<
    DadosFormulario | undefined
  >();

  const handlerSelectionProcesses = (id: number) => {
    const selected = selectionsProcesses.filter((item: any) => id === item.id);
    const lines = selected[0].research_lines;

    if (selected[0] !== null) {
      const selectedLines = lines.map((line: any) => {
        return {
          value: line.name,
          label: line.name,
        };
      });
      setResearhLines(selectedLines);
    }
  };

  useEffect(() => {
    // console.log(selectionsProcesses, 's');
    // console.log(processes, 's');
    if (processes[0] !== null) {
      setSelectionProcesses(processes);
    }
  }, [processes, processesLoading, processesError]);

  // useEffect(() => {
  //   if (dadosIniciais) {
  //     modal.onTrue();
  //   }
  // }, [dadosIniciais]);

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
        Dados do Usuário
      </Typography>
      <Stack spacing={2} mb={4}>
        {selectionsProcesses !== null &&
          selectionsProcesses.map((item: any) => {
            const color = getStatusColor(item.status);
            return (
              <SelectionProcessCard
                id={item.id}
                title={item.title}
                program={item.description}
                start_date={item.start_date}
                end_date={item.application_deadline}
                year={item.year}
                semester={item.semester}
                contact_info={item.contact_info}
                statusColor={color}
                edital_url={
                  'https://estudante.ifpb.edu.br/media/Edital_37_Selecao_Geral_MPTI_2025.1-assinado_T4osYnz.pdf'
                }
                onApply={() => {
                  // setDadosIniciais(undefined);
                  console.log(item.id, 'ididididid');
                  handlerSelectionProcesses(item.id);
                  modal.onTrue();
                }}
              />
            );
          })}
      </Stack>
      <CadastroFormModal
        open={modal.value}
        onClose={modal.onFalse}
        dadosIniciais={dadosIniciais}
        // opcoesTemaPesquisa={researshThems}
        opcoesLinhaPesquisa={researshLines}
      />
    </Box>
  );
};

export default CandidateHomolog;
