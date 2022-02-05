import React, { useEffect } from 'react';

import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { selectAuth } from '../redux/reducers/auth';

import Navbar from '../components/Content/Navbar';
import FooterComponent from '../components/Content/Footer';
import ContentComponent from '../components/Content';

const LayautMain = styled(Layout)`
  width: 100%;
  height: 100vh;
  min-width: 390px;
  min-height: 844px;

  background-color: purple !important;

  display: flex;
  flex-direction: column;
`;

const Dashboard = () => {
  const auth = useSelector(selectAuth);
  const navigator = useNavigate();

  useEffect(() => {
    !auth.login && navigator('/login', { replace: true });
  }, [auth, navigator]);

  return (
    <>
      <LayautMain>
        <Navbar />
        <ContentComponent />
        <FooterComponent />
      </LayautMain>
    </>
  );
};

export default Dashboard;
