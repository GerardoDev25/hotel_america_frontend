import styled from 'styled-components';
import { Provider } from 'react-redux';

import Router from './router';
import store from './redux';

const MainContainer = styled.main`
  width: 100%;
  height: 100vh;
`;

const index = () => {
  return (
    <Provider store={store}>
      <MainContainer>
        <Router />
      </MainContainer>
    </Provider>
  );
};

export default index;
