import OutLayout from './out-layout';
import InnerLayout from './inner-layout';

export default function Layout() {
  // TODO importar o user
  // se o user estiver logado
  // vai acessar tudo pela dashboard
  // se não vai acesar pelo layout com header
  const auth = false;
  return auth ? <InnerLayout /> : <OutLayout />;
}
