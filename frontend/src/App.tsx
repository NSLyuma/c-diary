import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './routes/Auth/Auth';
import { getUser } from './routes/Auth/authSlice';
import { RootState, useAppDispatch } from './store/store';
import PrivateRoute from './wrappers/PrivateRoute';
import PublicRoute from './wrappers/PublicRoute';

function App() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute isAuth={isAuth} />}>
            <Route path="/auth" element={<Auth />} />
          </Route>

          <Route element={<PrivateRoute isAuth={isAuth} />}>
            <Route path="/main" element={<div>Main</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
