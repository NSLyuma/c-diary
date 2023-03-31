import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Logo from '../Logo/Logo';
import styles from './Header.module.css';
import '../../styles/index.css';

function Header() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return (
    <header className={`${styles.header} container`}>
      <div className={styles.content}>
        <Logo />
        {isAuth ? (
          <div>name</div>
        ) : (
          <button className={styles.auth}>Войти</button>
        )}
      </div>
    </header>
  );
}

export default Header;
