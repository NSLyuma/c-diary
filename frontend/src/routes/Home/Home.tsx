import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../wrappers/PageWrapper';

function Home() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      HOME
      <button onClick={() => navigate('/profile')}>profile</button>
      <button onClick={() => navigate('/stats')}>stats</button>
    </PageWrapper>
  );
}

export default Home;
