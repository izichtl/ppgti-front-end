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
    { href: '/comissao/relatorios', text: 'Relatórios', icon: <ArticleIcon /> },
  ];

  const candidateMenuItems = [
    {
      href: '/candidate-dashboard',
      text: 'Dashboard',
      icon: <DashboardIcon />,
    },
    { href: '/process', text: 'Inscrever', icon: <AppRegistrationIcon /> },
    { href: '/documents', text: 'Documentos', icon: <ArticleIcon /> },
    { href: '/blog', text: 'Notícias', icon: <RssFeedIcon /> },
  ];

  const mainListItems = isCommitteeUser
    ? committeeMenuItems
    : candidateMenuItems;

  const secondaryListItems = [
    { href: '/help', text: 'Ajuda', icon: <InfoRoundedIcon /> },
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
              sx={{
                borderRadius: 1,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                },
                '&:hover': {
                  backgroundColor: 'primary.light',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                },
              }}
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
            <ListItemButton
              component={Link}
              to={item.href}
              sx={{
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
