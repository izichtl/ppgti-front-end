import { createBrowserRouter } from 'react-router-dom';
import ErrorComponent from '../pages/error';
import Login from '../pages/cadidate-login';
import LandingPage from '../pages/landpage';
import Blog from '../pages/blog';
import Dashboard2 from '../pages/dashboard';
import Layout from '../pages/layout';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '*',
        element: <ErrorComponent />,
      },
      {
        path: '/error',
        element: <ErrorComponent />,
      },
      {
        path: '/dashboard',
        element: <Dashboard2 />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/blog',
        element: <Blog />,
      },
    ],
  },
]);

export default router;
