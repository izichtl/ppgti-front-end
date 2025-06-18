import React, { useEffect, useState } from 'react';
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Stack,
  Box,
} from '@mui/material';
import CustomModal from '../custom-modal';
import ProjectUploaderField from '../project-uploader';
import { sanitizeFilename } from '../../utils/file-sanitazer';
import FullScreenLoader from '../loading';

const opcoesTemaPesquisa = [
  { value: 'Edge Computing', label: 'Edge Computing' },
];

export type DadosFormulario = {
  linha: string;
  tema: string;
  titulo: string;
  arquivo?: File | null;
};

type CadastroFormModalProps = {
  open: boolean;
  onClose: () => void;
  opcoesLinhaPesquisa: any;
  useFormikProps: any;
  loading: boolean;
};

const CadastroFormModal: React.FC<CadastroFormModalProps> = ({
  open,
  onClose,
  opcoesLinhaPesquisa,
  useFormikProps,
  loading,
}) => {
  const [themes, setThemes] = useState<any>(opcoesTemaPesquisa);

  useEffect(() => {
    if (useFormikProps.values.research_line_id !== 'Selecione uma linha') {
      const themes = opcoesLinhaPesquisa.filter(
        (line: any) => line.value === useFormikProps.values.research_line_id,
      );
      const newThemes = themes[0].research_topics.map((theme: any) => {
        return {
          id: theme.id,
          label: theme.name,
          value: theme.name,
        };
      });
      newThemes.unshift({
        id: 0,
        value: 'Selecione um tema',
        label: 'Selecione um tema',
      });
      setThemes(newThemes);
    }
  }, [useFormikProps]);

  const parsedName = sanitizeFilename(useFormikProps.values.project_title);

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title={'Cadastro no Processo Seletivo'}
      width={500}
    >
      {loading && <FullScreenLoader />}
      {!loading && (
        <>
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            mb={3}
          >
            {'Preencha os dados para enviar seu pré-projeto'}
          </Typography>

          <Stack spacing={3}>
            <FormControl margin="normal" fullWidth>
              <InputLabel>Linhas de Pesquisa</InputLabel>
              <Select
                fullWidth
                name="research_line_id"
                label="Linha de Pesquisa"
                value={useFormikProps.values.research_line_id}
                onChange={useFormikProps.handleChange}
                error={
                  !!useFormikProps.errors.research_line_id &&
                  !!useFormikProps.touched.research_line_id
                }
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 300,
                      maxWidth: '90vw',
                      overflowX: 'auto',
                    },
                  },
                }}
              >
                {opcoesLinhaPesquisa.map((opcao) => (
                  <MenuItem key={opcao.value} value={opcao.value}>
                    {opcao.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel>Tema de Pesquisa</InputLabel>
              <Select
                fullWidth
                name="research_topic_id"
                label="Linha de Pesquisa"
                disabled={
                  useFormikProps.values.research_line_id ===
                  'Selecione uma linha'
                }
                value={useFormikProps.values.research_topic_id}
                onChange={useFormikProps.handleChange}
                error={
                  !!useFormikProps.errors.research_topic_id &&
                  !!useFormikProps.touched.research_topic_id
                }
                MenuProps={{
                  PaperProps: {
                    sx: {
                      maxHeight: 300,
                      maxWidth: '90vw',
                      overflowX: 'auto',
                    },
                  },
                }}
              >
                {themes.map((opcao) => (
                  <MenuItem key={opcao.value} value={opcao.value}>
                    {opcao.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Título do Pré-Projeto"
              fullWidth
              name={'project_title'}
              value={useFormikProps.values.project_title}
              onChange={useFormikProps.handleChange}
              error={
                !!useFormikProps.errors.project_title &&
                !!useFormikProps.touched.project_title
              }
              helperText={useFormikProps.errors.project_title}
            />
            <Box key={'project-uploader'}>
              <ProjectUploaderField
                name={parsedName}
                useFormikProps={useFormikProps}
                filePrefix={'project'}
              />
            </Box>
            <Stack direction="row" spacing={2} mt={2}>
              <Button fullWidth variant="outlined" onClick={onClose}>
                Cancelar
              </Button>
              <Button
                fullWidth
                variant="contained"
                disabled={loading}
                onClick={useFormikProps.submitForm}
              >
                {'Enviar'}
              </Button>
            </Stack>
          </Stack>
        </>
      )}
    </CustomModal>
  );
};

export default CadastroFormModal;
