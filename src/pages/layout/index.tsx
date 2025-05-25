import OutLayout from './out-layout';
import InnerLayout from './inner-layout';
import { use, useEffect } from 'react';
import { useAuth } from '../../hooks/auth';

export default function Layout() {
  const { isAuthenticated } = useAuth();

  // TODO importar o user
  // se o user estiver logado
  // vai acessar tudo pela dashboard
  // se não vai acesar pelo layout com header
  const auth = isAuthenticated();
  useEffect(() => {
    console.log('Auth status:', auth);
  }, [auth]);
  return auth ? <InnerLayout /> : <OutLayout />;
}
