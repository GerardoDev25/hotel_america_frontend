import { Layout } from 'antd';
import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectAuth } from '../redux/reducers/auth';
import { getAllRegisterAsync } from '../redux/ActionsAsync/registerAA';

import Navbar from '../components/Content/Navbar';
import ContentComponent from '../components/Content';
import FooterComponent from '../components/Content/Footer';
import PanelComponent from '../components/sliceComponents/PanelComponent';
import { minZise } from '../helpers/settings';

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

  const auth = useSelector(selectAuth);
  const navigator = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    !auth.login && navigator('/login', { replace: true });
  }, [auth, navigator]);

  useEffect(() => {
    dispatch(getAllRegisterAsync());
  }, [dispatch]);

  return (
    <>
      <LayautMain>
        <PanelComponent />
        <Navbar />
        <ContentComponent />
        <FooterComponent />
      </LayautMain>
    </>
  );
};

export default Dashboard;
