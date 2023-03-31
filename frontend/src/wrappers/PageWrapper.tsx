import React, { useEffect } from 'react';
import { getUser } from '../routes/Auth/authSlice';
import { useAppDispatch } from '../store/store';

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

function PageWrapper({ children }: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return <div>{children}</div>;
}

export default PageWrapper;
