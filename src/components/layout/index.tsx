import { Outlet } from 'react-router-dom';
import Header from '../header';
import Sidebar from '../sidebar';
import { Box } from '@mui/material';
import AuthLayout from './auth';
import NoAuthLayout from './no-auth';

const GuardLayout = () => {
  // validate if user is logged in
  // const { status } = useAuth()
  // const LOCAL_EXECUTION = process.env.REACT_APP_LOCAL_EXECUTION === 'true'

  // useEffect(() => {
  //   console.log('status');
  //   // AUTH SECTION
  //   // IF LOCAL NO CALL AUTH
  //   // if (!LOCAL_EXECUTION) {
  //   //   // check if route isnt / or /auth
  //   //   const path = window.location.pathname
  //   //   if (status === 'not-logged' && !['/auth'].includes(path)) {
  //   //     window.location.href = '/auth'
  //   //   }
  //   // }
  // }, []);

  const isAuth = false;
  return <>{isAuth ? <AuthLayout /> : <NoAuthLayout />}</>;
};
export default GuardLayout;
