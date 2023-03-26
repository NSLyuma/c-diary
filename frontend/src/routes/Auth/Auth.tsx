import React, { useState, useRef } from 'react';

function Auth() {
  const [authType, setAuthType] = useState<string>('login');

  const userName = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const changeAuthType = () => {
    setAuthType((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  const enter = async () => {
    const userData = {
      userName: userName.current && userName.current.value,
      email: email.current && email.current.value,
      password: password.current && password.current.value,
    };

    const url = `/api/auth/${authType}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
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

      <button onClick={enter}>
        {authType === 'login' ? 'Войти' : 'Зарегистрироваться'}
      </button>
    </div>
  );
}

export default Auth;
