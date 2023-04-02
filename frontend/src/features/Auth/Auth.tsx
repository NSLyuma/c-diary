import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../store/store';
import { Box, Modal } from '@mui/material';
import { UserData } from '../../types';
import { enter } from './authSlice';
import styles from './Auth.module.css';
import Button, { ButtonTheme } from '../../reused/Button/Button';
import { boxStyle } from './boxStyle';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

function Auth({ open, setOpen }: Props) {
  const [authType, setAuthType] = useState<string>('login');

  const { register, handleSubmit } = useForm();

  const dispatch = useAppDispatch();

  const onFormSubmit = (data: any) => {
    console.log(data);
    const userData: UserData = {
      authType,
      ...data,
    };
    dispatch(enter(userData));
  };

  const changeAuthType = () => {
    setAuthType((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={boxStyle}>
        <form className={styles.form} onSubmit={handleSubmit(onFormSubmit)}>
          {authType === 'register' && (
            <input
              className={styles.input}
              {...register('userName')}
              type="text"
              name="userName"
              placeholder="Введите имя"
              required
            />
          )}

          <input
            className={styles.input}
            {...register('email')}
            type="email"
            name="email"
            placeholder="Введите email"
            required
          />

          <input
            className={styles.input}
            {...register('password')}
            type="password"
            name="password"
            placeholder="Введите пароль"
            required
          />

          <p className={styles.question}>
            {authType === 'login' ? 'Впервые у нас?' : 'Уже есть аккаунт?'}{' '}
            <button className={styles.switch} onClick={changeAuthType}>
              {authType === 'login' ? 'Зарегистрироваться' : 'Войти'}
            </button>
          </p>

          <Button
            type="submit"
            text={authType === 'login' ? 'Войти' : 'Зарегистрироваться'}
            theme={ButtonTheme.primary}
          />
        </form>
      </Box>
    </Modal>
  );
}

export default Auth;
