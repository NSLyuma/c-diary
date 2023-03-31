import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/Home/Home';
import Main from './routes/Main/Main';
import Profile from './routes/Profile/Profile';
import Stats from './routes/Stats/Stats';
import { RootState } from './store/store';
import PrivateRoute from './wrappers/PrivateRoute';
import PublicRoute from './wrappers/PublicRoute';

function App() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute isAuth={isAuth} />}>
            <Route path="/" element={<Main />} />
          </Route>

          <Route element={<PrivateRoute isAuth={isAuth} />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/stats" element={<Stats />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
