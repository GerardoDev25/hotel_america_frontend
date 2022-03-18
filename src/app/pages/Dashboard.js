import { Layout } from 'antd';
import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { parseJwt } from '../helpers';
import { minZise } from '../helpers/settings';

import { selectAuth } from '../redux/reducers/auth';

import { renewAsync } from '../redux/ActionsAsync/authAA';
import { getAllRegisterAsync } from '../redux/ActionsAsync/registerAA';

import Navbar from '../components/Content/Navbar';
import ContentComponent from '../components/Content';
import FooterComponent from '../components/Content/Footer';
import PanelComponent from '../components/sliceComponents/PanelComponent';

const LayautMain = styled(Layout)`
  width: 100%;
  height: 100vh;
  display: flex;
  min-width: ${minZise};
  min-height: 600px;
  position: relative;
  flex-direction: column;
`;

const Dashboard = () => {
  //

  const { login, token } = useSelector(selectAuth);
  const navigator = useNavigate();
  const dispatch = useDispatch();

  // * redirect to login if is not auth
  useEffect(() => {
    !login && navigator('/login', { replace: true });
  }, [login, navigator]);

  // * get all register id
  useEffect(() => {
    dispatch(getAllRegisterAsync());
  }, [login, dispatch]);

  // * check is token is expired
  useEffect(() => {
    const { exp } = parseJwt(token);
    const isExpired = Date.now() >= exp * 1000;
    isExpired && dispatch(renewAsync());
  }, [token, dispatch]);

  return (
    <LayautMain>
      <PanelComponent />
      <Navbar />
      <ContentComponent />
      <FooterComponent />
    </LayautMain>
  );
};

export default Dashboard;
