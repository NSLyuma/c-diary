import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../../wrappers/PageWrapper';

function Profile() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      PROFILE
      <button onClick={() => navigate('/home')}>home</button>
      <button onClick={() => navigate('/stats')}>stats</button>
    </PageWrapper>
  );
}

export default Profile;
