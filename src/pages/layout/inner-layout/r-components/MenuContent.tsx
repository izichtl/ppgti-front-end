import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { useLocation, Link } from 'react-router-dom';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import ArticleIcon from '@mui/icons-material/Article';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DescriptionIcon from '@mui/icons-material/Description';
import { useAuth } from '../../../../hooks/auth';

export default function MenuContent() {
  const { getUserFromToken } = useAuth();
  const location = useLocation();

  const user = getUserFromToken();
  const isCommitteeUser =
    user &&
    (user.role === 'committee' ||
      user.user_type === 'committee' ||
      location.pathname.includes('/comissao'));

  const committeeMenuItems = [
    { href: '/comissao/dashboard', text: 'Dashboard', icon: <DashboardIcon /> },
    {
      href: '/comissao/processos',
      text: 'Processos Seletivos',
      icon: <AppRegistrationIcon />,
    },
    { href: '/comissao/candidatos', text: 'Candidatos', icon: <GroupIcon /> },
    { href: '/comissao/documentos', text: 'Documentos', icon: <ArticleIcon /> },
    {
      href: '/comissao/relatorios',
      text: 'Relatórios',
      icon: <AssessmentIcon />,
    },
  ];

  const candidateMenuItems = [
    {
      href: '/candidate-dashboard',
      text: 'Processos e Inscrições',
      icon: <DashboardIcon />,
    },
    { href: '/documents', text: 'Documentos', icon: <DescriptionIcon /> },
  ];

  const mainListItems = isCommitteeUser
    ? committeeMenuItems
    : candidateMenuItems;

  const secondaryListItems = [
    { href: '/about', text: 'Sobre', icon: <InfoRoundedIcon /> },
  ];

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={Link}
              to={item.href}
              selected={location.pathname === item.href}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton component={Link} to={item.href}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
