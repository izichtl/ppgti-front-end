import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
  // Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import ScrollToTop from '../../components/scroll-top';
import { useBoolean } from '../../hooks/use-boolean';
import CadastroFormModal from '../../components/process-register-modal';
import { useGetSelectionProcesses } from '../../hooks/get-processes';
import SelectionProcessCard from '../../components/card-processes';
import { useStatusColor } from '../../hooks/use-status-color';
import * as Yup from 'yup';
import { useFormik, FormikProps } from 'formik';
import { useProcessAplication } from '../../hooks/process-aplication';
import useSWRMutation, { SWRMutationResponse } from 'swr/mutation';
import { useGetCandidateAplications } from '../../hooks/get-candidate-aplications';
import CardApplication from '../../components/card-application';
import LoadingBox from '../../components/loading-box';
import FullScreenLoader from '../../components/loading';
import { useAuth } from '../../hooks/auth';
import { useNavigate } from 'react-router-dom';

type initialCandidateProps = {
  process_id: number;
  research_line_id: string;
  research_topic_id: string;
  project_title: string;
  project_file_name: string;
  project: any;
};
const DashboardCandidato = () => {
  const theme = useTheme();
  const modal = useBoolean();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const auth = isAuthenticated();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentDateTime = new Date().toLocaleString('pt-BR');
  const [researshLines, setResearhLines] = useState([]);

  // main state data
  const [selectionsProcesses, setSelectionProcesses] = useState([]);
  const [applicationsProcesses, setApplicationsProcesses] = useState([]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info' as 'success' | 'error' | 'warning' | 'info',
  });
  const getStatusColor = useStatusColor();

  const { processes, processesLoading, processesError } =
    useGetSelectionProcesses();

  const { aplications, aplicationsLoading, aplicationsError } =
    useGetCandidateAplications();

  const initial: initialCandidateProps = {
    process_id: 0,
    research_line_id: 'Selecione uma linha',
    research_topic_id: 'Selecione um tema',
    project_title: '',
    project_file_name: '',
    project: null,
  };

  const getIdByName = (
    processId: number,
    type: 'line' | 'topic',
    name: string,
  ): number => {
    if (processId === 0 || !name) return 0;

    const process = selectionsProcesses.find((p) => p.id === processId);
    if (!process) return 0;

    const line = process.research_lines.find((l) =>
      type === 'line'
        ? l.name === name
        : l.research_topics?.some((t) => t.name === name),
    );

    if (!line) return 0;

    if (type === 'line') {
      console.log('typeLine,', line);
      return line.id;
    }

    const topic = line.research_topics?.find((t) => t.name === name);
    return topic?.id || 0;
  };

  const useFormikProps: FormikProps<initialCandidateProps> =
    useFormik<initialCandidateProps>({
      initialValues: initial,
      validateOnBlur: false,
      validateOnMount: false,
      validationSchema: Yup.object({
        process_id: Yup.number()
          .notOneOf([0], 'Selecione um processo válido')
          .required('Obrigatório'),

        research_line_id: Yup.string()
          .notOneOf(
            ['Selecione uma linha'],
            'Selecione uma Linha de Pesquisa válida',
          )
          .required('Selecione a Linha de Pesquisa'),

        research_topic_id: Yup.string()
          .notOneOf(
            ['Selecione um tema'],
            'Selecione um Tema de Pesquisa válido',
          )
          .required('Selecione o Tema do Projeto'),

        project_title: Yup.string().required(
          'O título do projeto é obrigatório',
        ),
        project: Yup.mixed()
          .required('O projeto é obrigatório')
          .test('fileType', 'Formato inválido (apenas PDF)', (value) =>
            // @ts-expect-error
            value ? value.type === 'application/pdf' : false,
          )
          .test('fileSize', 'O arquivo é muito grande (máx: 5MB)', (value) =>
            // @ts-expect-error
            value ? value.size <= 5 * 1024 * 1024 : false,
          ),
      }),

      onSubmit: async () => {
        await handleUpload();
      },
    });

  const { useProcessAplicationFetcher } = useProcessAplication({
    process_id: useFormikProps.values.process_id,
    research_line_id: getIdByName(
      useFormikProps.values.process_id,
      'line',
      useFormikProps.values.research_line_id,
    ),
    research_topic_id: getIdByName(
      useFormikProps.values.process_id,
      'topic',
      useFormikProps.values.research_topic_id,
    ),
    project_title: useFormikProps.values.project_title,
    project_file_name: useFormikProps.values.project_file_name,
    file: useFormikProps.values.project,
  } as any);

  const { trigger: triggerAplication, isMutating }: SWRMutationResponse<any> =
    useSWRMutation('useProcessAplicationFetcher', useProcessAplicationFetcher, {
      revalidate: false,
    });

  const handleUpload = async () => {
    try {
      await triggerAplication();
      setSnackbar({
        open: true,
        message: 'Inscrição Realizada com Sucesso',
        severity: 'success',
      });
      useFormikProps.resetForm();
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erro a realizar inscrição - Tente Novamente',
        severity: 'error',
      });
      useFormikProps.resetForm();
    } finally {
      setTimeout(() => {
        modal.onFalse();
        setSnackbar((prev) => ({ ...prev, open: false }));
      }, 1000);
    }
  };

  const handlerSelectionProcesses = (id: number) => {
    const selected = selectionsProcesses.filter((item: any) => id === item.id);
    const lines = selected[0].research_lines;

    if (selected[0] !== null) {
      const selectedLines = lines.map((line: any) => {
        return {
          id: line.id,
          value: line.name,
          label: line.name,
          research_topics: line.research_topics,
        };
      });
      selectedLines.unshift({
        id: 0,
        value: 'Selecione uma linha',
        label: 'Selecione uma linha',
      });
      setResearhLines(selectedLines);
      useFormikProps.setFieldValue('process_id', id);
    }
  };

  const handlerClose = () => {
    useFormikProps.resetForm();
    modal.onFalse();
  };

  useEffect(() => {
    if (processes[0] !== undefined) {
      setSelectionProcesses(processes);
    }
  }, [processes, processesLoading, processesError]);

  useEffect(() => {
    if (aplications[0] !== undefined) {
      setApplicationsProcesses(aplications);
    }
  }, [aplications, aplicationsLoading, aplicationsError]);

  useEffect(() => {
    if (!auth) {
      navigate('/');
    }
  }, [auth]);

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
      {aplicationsLoading && processesLoading && (
        <LoadingBox>
          <FullScreenLoader />
        </LoadingBox>
      )}
      {(!aplicationsLoading || !processesLoading) && (
        <>
          <Grid container spacing={2} alignItems="center" mb={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h3" fontWeight="bold">
                Processos Seletivos
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
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
                      handlerSelectionProcesses(item.id);
                      modal.onTrue();
                    }}
                  />
                );
              })}
          </Stack>
          {applicationsProcesses[0] !== undefined && (
            <>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Suas Inscrições
              </Typography>
              <Stack spacing={2}></Stack>
              <CardApplication inscricoes={applicationsProcesses} />
            </>
          )}
          {applicationsProcesses[0] === undefined && (
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Você não tem inscrições
            </Typography>
          )}

          <CadastroFormModal
            open={modal.value}
            useFormikProps={useFormikProps}
            onClose={handlerClose}
            opcoesLinhaPesquisa={researshLines}
            loading={isMutating}
          />

          {snackbar.open && (
            <Box mb={2}>
              <Snackbar
                open={snackbar.open}
                autoHideDuration={1000}
                onClose={() =>
                  setSnackbar((prev) => ({ ...prev, open: false }))
                }
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              >
                <Alert
                  severity={snackbar.severity}
                  onClose={() =>
                    setSnackbar((prev) => ({ ...prev, open: false }))
                  }
                  sx={{ width: '100%' }}
                >
                  {snackbar.message}
                </Alert>
              </Snackbar>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};
export default DashboardCandidato;
