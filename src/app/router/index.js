import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import LoginPage from '../pages/LoginPage';
import Redirect from '../pages/Redirect';

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
