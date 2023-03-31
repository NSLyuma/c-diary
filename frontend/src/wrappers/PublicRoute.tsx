import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
  isAuth: boolean;
};

function PublicRoute({ isAuth }: Props) {
  if (isAuth) return <Navigate to="/home" />;

  return <Outlet />;
}

export default PublicRoute;
