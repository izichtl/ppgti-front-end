import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Link,
} from '@mui/material';

const editais = [
  {
    title: 'Edital Credenciamento PPGTI 2021 10 de agosto de 2021.pdf',
    url: '/docs/edital-credenciamento-2021.pdf',
    description:
      'Edital de credenciamento para docentes permanentes e colaboradores do Programa de Pós-Graduação em Tecnologia da Informação',
    publishedAt: '13/08/2021 10h18',
  },
  {
    title: 'Resultado do edital de credenciamento 2021 Assinado.pdf',
    url: '/docs/resultado-edital-2021.pdf',
    description: 'Resultado do edital de credenciamento do PPGTI 2021',
    publishedAt: '08/09/2021 14h32',
  },
];

export default function EditaisTable() {
  return (
    <>
      <Typography variant='h5' sx={{ mb: 2 }}>
        Documentos
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Título</strong>
              </TableCell>
              <TableCell>
                <strong>Descrição</strong>
              </TableCell>
              <TableCell>
                <strong>Publicado em</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {editais.map((edital, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Link href={edital.url} target='_blank' rel='noopener'>
                    {edital.title}
                  </Link>
                </TableCell>
                <TableCell>{edital.description}</TableCell>
                <TableCell>{edital.publishedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
