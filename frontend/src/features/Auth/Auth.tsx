import React, { useState, useRef } from 'react';
import { RootState, useAppDispatch } from '../../store/store';
import { Box, Modal } from '@mui/material';
import { UserData } from '../../types';
import { enter } from './authSlice';
import Button, { ButtonTheme } from '../../reused/Button/Button';
import { boxStyle } from './boxStyle';
import { useSelector } from 'react-redux';
import styles from './Auth.module.css';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

function Auth({ open, setOpen }: Props) {
  const [authType, setAuthType] = useState<string>('login');

  const error = useSelector((state: RootState) => state.auth.enterError);

  const userName = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const handleEnter = async () => {
    const userData: UserData = {
      authType,
      userName: userName.current && userName.current.value,
      email: email.current && email.current.value,
      password: password.current && password.current.value,
    };

    dispatch(enter(userData));
  };

  const changeAuthType = () => {
    setAuthType((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={boxStyle}>
        {error && <p className={styles.error}>{error}</p>}

        {authType === 'register' && (
          <input
            className={styles.input}
            ref={userName}
            type="text"
            name="userName"
            placeholder="Введите имя"
          />
        )}

        <input
          className={styles.input}
          ref={email}
          type="email"
          name="email"
          placeholder="Введите email"
        />

        <input
          className={styles.input}
          ref={password}
          type="password"
          name="password"
          placeholder="Введите пароль"
        />

        <p className={styles.question}>
          {authType === 'login' ? 'Впервые у нас?' : 'Уже есть аккаунт?'}{' '}
          <button className={styles.switch} onClick={changeAuthType}>
            {authType === 'login' ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </p>

        <Button
          text={authType === 'login' ? 'Войти' : 'Зарегистрироваться'}
          onClick={handleEnter}
          theme={ButtonTheme.primary}
        />
      </Box>
    </Modal>
  );
}

export default Auth;
