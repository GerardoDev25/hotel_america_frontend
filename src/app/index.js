import styled from 'styled-components';
import 'antd/dist/antd.min.css';
import Router from './router';

const MainContainer = styled.main`
  width: 100%;
  height: 100vh;
  background-color: red;
`;

const index = () => {
  return (
    <MainContainer>
      <Router />
    </MainContainer>
  );
};

export default index;
