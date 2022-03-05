import styled from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoadComponent from '../components/Content/Load';

import Dashboard from '../pages/Dashboard';
import LoginPage from '../pages/LoginPage';
import Redirect from '../pages/Redirect';

const Container = styled.div`
  position: relative;
`;

const index = () => {
  return (
    <Container>
      <LoadComponent />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Redirect />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default index;
