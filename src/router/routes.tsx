import { createBrowserRouter } from "react-router-dom";
import ErrorComponent from "../pages/error";
import Login from "../pages/cadidate-login";
import LandingPage from "../pages/landpage";
import Blog from "../pages/blog";
import Dashboard2 from "../pages/dashboard";
import ComissaoLoginPage from "../pages/comissao/login";

import ComissaoDashboardPage from "../pages/comissao/dashboard";

import Layout from "../pages/layout";
import UnderConstructionComponent from "../pages/under-contruction";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "*",
        element: <ErrorComponent />,
      },
      {
        path: "/error",
        element: <ErrorComponent />,
      },
      {
        path: "/dashboard",
        element: <UnderConstructionComponent />,
        // children: [
        //   {
        //     path: 'relatorios',
        //     element: <UnderConstructionComponent />,
        //   },
        // ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/documents",
        element: <UnderConstructionComponent />,
      },
      {
        path: "/about",
        element: <UnderConstructionComponent />,
      },
      {
        path: "/comissao/login",
        element: <ComissaoLoginPage />,
      },
      {
        path: "/comissao/dashboard",
        element: <ComissaoDashboardPage />,
      },
    ],
  },
]);

export default router;
