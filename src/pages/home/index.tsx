import React from 'react';
import { VITE_LOCAL_TOKEN } from '../../config';

const Home: React.FC = () => {
  return (
    <>
      HOME PAGE - auth
      {VITE_LOCAL_TOKEN}
    </>
  );
};

export default Home;
