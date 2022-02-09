import { Layout } from 'antd';
import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { selectAuth } from '../redux/reducers/auth';

import Navbar from '../components/Content/Navbar';
import ContentComponent from '../components/Content';
import FooterComponent from '../components/Content/Footer';
import { getAllRegisterAsync } from '../redux/ActionsAsync/registerAA';

const LayautMain = styled(Layout)`
  width: 100%;
  height: 100vh;
  display: flex;
  min-width: 390px;
  flex-direction: column;
`;

const Dashboard = () => {
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
        <Navbar />
        <ContentComponent />
        <FooterComponent />
      </LayautMain>
    </>
  );
};

export default Dashboard;
