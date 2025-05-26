import { createBrowserRouter } from 'react-router-dom';
import ErrorComponent from '../pages/error';
import Login from '../pages/cadidate-login';
import LandingPage from '../pages/landpage';
import Blog from '../pages/blog';
import Layout from '../pages/layout';
import UnderConstructionComponent from '../pages/under-contruction';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
        handle: { title: 'Início' },
      },
      {
        path: '/login',
        element: <Login />,
        handle: { title: 'Login' },
      },
      {
        path: '/blog',
        element: <Blog />,
        handle: { title: 'Blog' },
      },
      {
        path: '/dashboard',
        element: <UnderConstructionComponent />,
        handle: { title: 'Dashboard' },
      },
      {
        path: '/documents',
        element: <UnderConstructionComponent />,
        handle: { title: 'Documentos' },
      },
      {
        path: '/process',
        element: <UnderConstructionComponent />,
        handle: { title: 'Processo Seletivo' },
      },
      {
        path: '/about',
        element: <UnderConstructionComponent />,
        handle: { title: 'Sobre' },
      },
      {
        path: '/error',
        element: <ErrorComponent />,
        handle: { title: 'Erro' },
      },
      {
        path: '*',
        element: <ErrorComponent />,
        handle: { title: 'Página não encontrada' },
      },
    ],
  },
]);

export default router;
