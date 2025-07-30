import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: 'red',
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

// Mapeia os segmentos do path para nomes legíveis
const breadcrumbMap: Record<string, string> = {
  '': 'Início',
  candidate: 'Candidato',
  blog: 'Blog',
  documents: 'Documentos',
  process: 'Processo Seletivo',
  about: 'Sobre',
  login: 'Login',
  error: 'Erro',
  comissao: 'Comissão',
  processos: 'Processos',
  candidatos: 'Candidatos',
  documentos: 'Documentos',
  relatorios: 'Relatórios',
  confirmation: 'Confirmação',
  selection: 'Inscrição',
  dashboard: 'Processos e Inscrições',
};

export default function NavbarBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean); // remove strings vazias

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {/* Home sempre como o primeiro */}
      <Link underline="hover" color="inherit" component={RouterLink} to="/">
        Home
      </Link>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const label = breadcrumbMap[value] || value;

        return isLast ? (
          <Typography
            key={to}
            variant="body1"
            sx={{ color: 'text.primary', fontWeight: 600 }}
          >
            {label}
          </Typography>
        ) : (
          <Link
            key={to}
            underline="hover"
            color="inherit"
            component={RouterLink}
            to={to}
          >
            {label}
          </Link>
        );
      })}
    </StyledBreadcrumbs>
  );
}
