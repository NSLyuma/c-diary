import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Logo.module.css';

function Logo() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/')}>
      <img className={styles.logo} src="/img/logo.png" alt="Лого" />
    </button>
  );
}

export default Logo;
