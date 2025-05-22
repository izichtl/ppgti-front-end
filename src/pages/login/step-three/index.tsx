import React, { useEffect, useState } from 'react';
import { Input, Button, Typography, Box } from '@mui/material';
import { useFileUpload } from '../../../hooks/file-uploader';
import useSWRMutation, { SWRMutationResponse } from 'swr/mutation';
import UploaderField from '../../../components/uploader/index';
import { filePrefixes } from '../../../utils/files-hash-mapper';
import { sanitizeFilename } from '../../../utils/file-sanitazer';
import { useGetCandidateFiles } from '../../../hooks/file-lister';

type FileNameProps = {
  prefix: string;
  name: string;
};

interface UserFiles {
  cpf: string;
  id: number;
  _comprovante_residencia_: string | null;
  _declaracao_cota_ingresso_: string | null;
  _declaracao_cota_servidor_: string | null;
  _diploma_certificado_: string | null;
  _formulario_pontuacao_: string | null;
  _identidade_cpf_: string | null;
  _historico_graducao_: string | null;
  _quitacao_eleitoral_: string | null;
  _quitacao_militar_: string | null;
}

const initialFiles = {
  cpf: '',
  id: 0,
  _comprovante_residencia_: null,
  _declaracao_cota_ingresso_: null,
  _declaracao_cota_servidor_: null,
  _diploma_certificado_: null,
  _identidade_cpf_: null,
  _formulario_pontuacao_: null,
  _historico_graducao_: null,
  _quitacao_eleitoral_: null,
  _quitacao_militar_: null,
};

function extractFileName(fileName: string): string {
  const parts = fileName.split('_eh_');
  return parts.length > 1 ? parts[1] : fileName;
}

const StepThree = ({ cpf }: any) => {
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
      setFileName({ prefix: prefix, name: sanitizeFilename(name) });
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
      const response = await triggerUploader();
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
    console.log(files, 'arquivos');
    if (files[0] !== undefined) {
      setCandidateFiles(files[0]);
    }
  }, [files, filesLoading, filesError]);

  return (
    <div>
      <Typography variant='h6'>Comprovantes</Typography>
      {filePrefixes.map((input: any) => {
        const id: string = input.id;
        //@ts-expect-error
        const name: string = candidateFiles[id];
        const parsedName = name !== null ? extractFileName(name) : '';
        return (
          <>
            {!filesLoading && (
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
            )}
            {filesLoading && <>LOADING</>}
          </>
        );
      })}
    </div>
  );
};

export default StepThree;
