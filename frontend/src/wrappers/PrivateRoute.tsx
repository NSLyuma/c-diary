import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type Props = {
  isAuth: boolean;
};

function PrivateRoute({ isAuth }: Props) {
  if (!isAuth) return <Navigate to="/auth" />;

  return <Outlet />;
}

export default PrivateRoute;
