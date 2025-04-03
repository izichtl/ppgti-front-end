import { createBrowserRouter, redirect } from 'react-router-dom';
// import Home from '../pages/home';
import Login from '../pages/cadidate-login';
import Layout from '../components/layout';
// import Help from '../pages/help';
// import Dashboard from '../pages/dashboard';
import PDFViewer from '../pages/pdf-view';

const ErrorComponent = () => {
  return <h1>Pagina de erro generico</h1>;
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '*',
        element: <ErrorComponent />,
      },
      {
        path: '/error',
        element: <ErrorComponent />,
      },
      // {
      //   path: '/dashboard',
      //   element: <Dashboard />,
      // },
      {
        path: '/login',
        element: <Login />,
      },
      // {
      //   path: '/help',
      //   element: <Help />,
      // },
      {
        path: '/pdf',
        element: <PDFViewer />,
      },
      {
        path: '/',
        element: <Login />,
      },
    ],
  },
]);

export default router;
