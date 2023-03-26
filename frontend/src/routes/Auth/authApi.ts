import { UserData } from '../../types';

export const requestEnter = async (userData: UserData) => {
  const url = `/api/auth/${userData.authType}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  console.log(data);

  if (!response.ok) throw new Error(data.error);

  return data;
};
