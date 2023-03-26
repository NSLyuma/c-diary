import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './routes/Auth/Auth';
import PublicRoute from './wrappers/PublicRoute';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRoute />}>
            <Route path="/auth" element={<Auth />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
