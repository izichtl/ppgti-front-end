import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../../../hooks/auth';
import {
  CommitteeSidebar,
  CandidateSidebar,
} from '../../../../components/sidebar';

export default function SideMenu() {
  const { getUserFromToken } = useAuth();
  const location = useLocation();

  const user = React.useMemo(() => getUserFromToken(), [getUserFromToken]);

  const isCommitteeUser =
    user &&
    (user.role === 'committee' ||
      user.user_type === 'committee' ||
      location.pathname.includes('/comissao'));

  return (
    <div style={{ display: 'block' }}>
      {isCommitteeUser ? <CommitteeSidebar /> : <CandidateSidebar />}
    </div>
  );
}
