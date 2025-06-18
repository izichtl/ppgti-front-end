import React from 'react';
import {
  Paper,
  Typography,
  Button,
  Stack,
  Link,
  useTheme,
} from '@mui/material';

type Application = {
  program: string;
  period: string;
  line: string;
  topic: string;
  tittle: string;
  date: string;
  project_url: string;
};

type CardApplicationProps = {
  inscricoes: Application[];
};

const CardApplication: React.FC<CardApplicationProps> = ({ inscricoes }) => {
  const theme = useTheme();

  return (
    <Stack spacing={2}>
      {inscricoes.map((item, index) => (
        <Paper
          key={index}
          elevation={2}
          sx={{
            p: 2.5,
            border: `2px solid ${theme.palette.success.main}`,
            borderRadius: 3,
            cursor: 'pointer',
            transition: '0.2s',
            width: '100%',
            '&:hover': { boxShadow: 6 },
          }}
        >
          <Typography variant="body1">
            <strong>Programa:</strong> {item.program}
          </Typography>
          <Typography variant="body1">
            <strong>Ano/Semestre:</strong> {item.period}
          </Typography>
          <Typography variant="body1">
            <strong>Linha:</strong> {item.line}
          </Typography>
          <Typography variant="body1">
            <strong>Tema:</strong> {item.topic}
          </Typography>
          <Typography variant="body1">
            <strong>Título do Pré-Projeto:</strong> {item.tittle}
          </Typography>
          <Typography variant="body1">
            <strong>Data da Inscrição:</strong> {item.date}
          </Typography>
          <Button
            component={Link}
            href={item.project_url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              mt: 2,
              px: 3,
              bgcolor: theme.palette.success.main,
              '&:hover': {
                bgcolor: theme.palette.success.dark,
              },
            }}
            variant="contained"
          >
            Pré-Projeto
          </Button>
        </Paper>
      ))}
    </Stack>
  );
};

export default CardApplication;
