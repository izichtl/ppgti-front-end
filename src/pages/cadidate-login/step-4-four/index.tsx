import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useFileUpload } from '../../../hooks/file-uploader';
import useSWRMutation, { SWRMutationResponse } from 'swr/mutation';
import UploaderField from '../../../components/uploader/index';
import { filePrefixes } from '../../../utils/files-hash-mapper';
import { sanitizeFilename } from '../../../utils/file-sanitazer';
import { useGetCandidateFiles } from '../../../hooks/file-lister';
import FullScreenLoader from '../../../components/loading';

type FileNameProps = {
  prefix: string;
  name: string;
};

interface UserFiles {
  cpf: string;
  id: number;
  proof_of_residence: string | null;
  quota_declaration_admission: string | null;
  quota_declaration_if: string | null;
  diploma_certificate: string | null;
  score_form: string | null;
  undergraduate_transcript: string | null;
  registration_clearance: string | null;
  electoral_clearance: string | null;
  military_clearance: string | null;
}

const initialFiles = {
  cpf: '',
  id: 0,
  proof_of_residence: null,
  quota_declaration_admission: null,
  quota_declaration_if: null,
  diploma_certificate: null,
  registration_clearance: null,
  score_form: null,
  undergraduate_transcript: null,
  electoral_clearance: null,
  military_clearance: null,
};

function extractFileName(fileName: string): string {
  // console.log(fileName, 'fileName');
  const parts = fileName.split('_eh');
  // console.log(parts, 'parts');
  return parts.length > 1 ? parts[1] : fileName;
}

const StepFour = ({ cpf, sex, quota }: any) => {
  console.log(sex, quota, 'userInfo');
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<FileNameProps>({
    prefix: '',
    name: '',
  });
  const [uploading, setUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [fileSelected, setFileSelected] = useState<string | null>(null);
  const [candidateFiles, setCandidateFiles] = useState<UserFiles>(initialFiles);

  const { files, filesLoading, filesError } = useGetCandidateFiles();

  const { useFileUploadFetcher } = useFileUpload({
    file: file as File,
    cpf: cpf,
    prefix: fileName.prefix,
    name: fileName.name,
  });

  const { trigger: triggerUploader, isMutating }: SWRMutationResponse<any> =
    useSWRMutation('useFileUploadFetcher', useFileUploadFetcher, {
      revalidate: false,
    });

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    prefix: string
  ) => {
    const selectedFile = event.target.files?.[0];
    const name = selectedFile?.name as string;
    if (selectedFile) {
      setFile(selectedFile);
      setFileName({ prefix, name: sanitizeFilename(name) });
      setFileSelected(prefix);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Nenhum arquivo selecionado.');
      return;
    }

    setUploading(true);
    try {
      await triggerUploader();
      setMessage('Arquivo enviado com sucesso!');
      setFile(null);
      setFileSelected(null);
    } catch (error) {
      setMessage('Erro ao enviar o arquivo.');
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (files[0] !== undefined) {
      setCandidateFiles(files[0]);
    }
  }, [files, filesLoading, filesError]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {/* {candidateFiles.id === 0 && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1300,
            bgcolor: 'rgba(255,255,255,0.8)',
          }}
        >
          <FullScreenLoader />
        </Box>
      )} */}

      {candidateFiles.id !== 10 && (
        <Box sx={{ bgcolor: '#f0f4f8', minHeight: '100vh', p: 2, pt: 8 }}>
          <Paper
            elevation={isMobile ? 0 : 3}
            sx={{
              maxWidth: 900,
              mx: 'auto',
              p: 4,
              borderRadius: isMobile ? 0 : 2,
              bgcolor: '#fff',
            }}
          >
            <Typography variant='h5' align='center' gutterBottom>
              Comprovantes
            </Typography>
            <Typography
              variant='body2'
              align='center'
              color='text.secondary'
              gutterBottom
            >
              Anexe os documentos solicitados abaixo.
            </Typography>

            <Grid container spacing={3}>
              {filePrefixes.map((input: any) => {
                const id: string = input.id;
                //@ts-expect-error
                const name: string = candidateFiles[id];
                const parsedName = name !== null ? extractFileName(name) : '';
                const sexField = sex === input.control;
                const quotaField = quota === input.control;
                return (
                  (input.control === '' || quotaField || sexField) && (
                    <Grid item xs={12} key={id}>
                      {/* {!filesLoading && ( */}
                      <UploaderField
                        //@ts-expect-error
                        hasFile={candidateFiles[id] !== null}
                        name={parsedName}
                        loading={isMutating}
                        fileSelected={fileSelected}
                        filePrefix={input.id}
                        onClick={handleUpload}
                        onChange={handleFileChange}
                        title={input.label}
                      />
                      {/* )} */}
                    </Grid>
                  )
                );
              })}
            </Grid>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant='contained'
                color='primary'
                size='large'
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  borderRadius: 2,
                }}
                onClick={handleUpload}
                disabled={uploading}
              >
                {uploading ? 'Enviando...' : 'Enviar'}
              </Button>
            </Box>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default StepFour;
