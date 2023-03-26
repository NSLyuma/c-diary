import React, { useState } from 'react';

function Auth() {
  const [authType, setAuthType] = useState<string>('login');

  const changeAuthType = () => {
    setAuthType((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  return (
    <div>
      {authType === 'register' && (
        <input type="text" placeholder="Введите имя" />
      )}
      <input type="email" placeholder="Введите email" />
      <input type="password" placeholder="Введите пароль" />
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
    </div>
  );
}

export default Auth;
