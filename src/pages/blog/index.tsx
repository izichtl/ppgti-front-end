import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import MainContent from '../../components/r-main/index';

export default function Blog(props: { disableCustomTheme?: boolean }) {
  return (
    <>
      <CssBaseline enableColorScheme />
      <Container
        maxWidth='lg'
        component='main'
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <MainContent />
      </Container>
    </>
  );
}
