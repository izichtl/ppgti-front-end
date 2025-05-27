import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import ArticleIcon from '@mui/icons-material/Article';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const mainListItems = [
  { href: '/process', text: 'Inscrever', icon: <AppRegistrationIcon /> },
  { href: '/documents', text: 'Documentos', icon: <ArticleIcon /> },
  { href: '/blog', text: 'Notícias', icon: <RssFeedIcon /> },
];

const secondaryListItems = [
  { href: '/about', text: 'Sobre', icon: <InfoRoundedIcon /> },
];

export default function MenuContent() {
  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component='a'
              href={item.href}
              selected={index === 0}
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
            <ListItemButton component='a' href={item.href}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
