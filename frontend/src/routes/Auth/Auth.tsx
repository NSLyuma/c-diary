import React, { useState, useRef } from 'react';
import { useAppDispatch } from '../../store/store';
import { UserData } from '../../types';
import PageWrapper from '../../wrappers/PageWrapper';
import { enter } from './authSlice';

function Auth() {
  const [authType, setAuthType] = useState<string>('login');

  const userName = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();

  const changeAuthType = () => {
    setAuthType((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  const handleEnter = async () => {
    const userData: UserData = {
      authType,
      userName: userName.current && userName.current.value,
      email: email.current && email.current.value,
      password: password.current && password.current.value,
    };

    dispatch(enter(userData));
  };

  return (
    <PageWrapper>
      {authType === 'register' && (
        <input
          ref={userName}
          type="text"
          name="userName"
          placeholder="Введите имя"
        />
      )}

      <input
        ref={email}
        type="email"
        name="email"
        placeholder="Введите email"
      />

      <input
        ref={password}
        type="password"
        name="password"
        placeholder="Введите пароль"
      />

      {authType === 'login' ? (
        <p>
          Впервые у нас?{' '}
          <button onClick={changeAuthType}>Зарегистрироваться</button>
        </p>
      ) : (
        <p>
          Уже есть аккаунт? <button onClick={changeAuthType}>Войти</button>
        </p>
      )}

      <button onClick={handleEnter}>
        {authType === 'login' ? 'Войти' : 'Зарегистрироваться'}
      </button>
    </PageWrapper>
  );
}

export default Auth;
