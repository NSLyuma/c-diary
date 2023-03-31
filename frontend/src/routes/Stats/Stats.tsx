import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../wrappers/PageWrapper';

function Stats() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      STATS
      <button onClick={() => navigate('/home')}>home</button>
      <button onClick={() => navigate('/profile')}>profile</button>
    </PageWrapper>
  );
}

export default Stats;
