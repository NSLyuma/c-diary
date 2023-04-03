import { UserData } from '../../types';

export const requestIsAuth = async () => {
  const response = await fetch('/api/auth/user');
  const data = response.json();

  if (!response.ok) throw new Error('Ошибка при поиске пользователя');

  return data;
};

export const requestEnter = async (userData: UserData) => {
  const url = `/api/auth/${userData.authType}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.error);

  return data;
};
