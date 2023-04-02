import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Logo from '../../reused/Logo/Logo';
import styles from './Header.module.css';
import '../../styles/index.css';
import Auth from '../Auth/Auth';

function Header() {
  const [open, setOpen] = useState<boolean>(false);

  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return (
    <header className={`${styles.header} container`}>
      <div className={styles.content}>
        <Logo />
        {isAuth ? (
          <div>name</div>
        ) : (
          <button className={styles.auth} onClick={() => setOpen(true)}>
            Войти
          </button>
        )}
      </div>

      <Auth open={open} setOpen={setOpen} />
    </header>
  );
}

export default Header;
