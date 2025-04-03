import { Input, Button, Typography, Box } from '@mui/material';
import { useEffect } from 'react';

const UploaderField = ({
  name,
  hasFile,
  loading,
  fileSelected,
  filePrefix,
  onClick,
  onChange,
  title,
}: any) => {
  // TODO PRECISA ADICIONAR UM BOTÃO
  // PARA O USUÁRIO VISUALIZAR O PDF ENVIADO
  useEffect(() => {}, [hasFile]);
  return (
    <Box sx={{ marginBottom: '28px' }}>
      {!loading && (
        <>
          <Typography variant='body2' color='primary'>
            {title}
          </Typography>
          {hasFile ? (
            <Typography variant='body2' color='success'>
              {name} (Enviado)
            </Typography>
          ) : (
            <Input
              type='file'
              onChange={(e) => onChange(e, filePrefix)}
              inputProps={{ accept: 'application/pdf' }}
            />
          )}
        </>
      )}

      {loading && (
        <Typography variant='body2' color='primary'>
          Enviando arquivo...
        </Typography>
      )}

      <Button
        disabled={fileSelected !== filePrefix}
        variant='contained'
        color='primary'
        onClick={onClick}
      >
        Enviar
      </Button>
    </Box>
  );
};

export default UploaderField;
