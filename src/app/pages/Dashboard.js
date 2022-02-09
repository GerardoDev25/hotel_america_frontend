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
import { selectNavbar, clesedPanel } from '../redux/reducers/navbar';
const LayautMain = styled(Layout)`
  width: 100%;
  height: 100vh;
  display: flex;
  min-width: 390px;
  position: relative;
  flex-direction: column;
`;

const PanelComponent = styled.div`
  width: 100%;
  z-index: 100;
  display: none;
  height: 100vh;
  padding: 2rem;
  padding-top: 5rem;
  position: absolute;
  background-color: transparent;

  border-radius: 1rem;
  top: ${({ panel }) => (panel ? '0%' : '-150%')};

  transition: top 0.2s ease-in;

  @media screen and (max-width: 600px) {
    display: block;
  }
`;

const PanelInfo = styled.div`
  width: 20rem;
  height: 15rem;
  margin-left: auto;
  background-color: rgba(0, 0, 0, 0.3);

  border-radius: 1rem;
  top: ${({ panel }) => {
    console.log(panel);
    return panel ? '50%' : '-150%';
  }};

  transition: top 0.2s ease-in;

  /* right: 1.5rem;
    border-top-right-radius: 0;
    z-index: 10;
    cursor: pointer;
    padding: 1.5rem;
    position: absolute;
    flex-direction: column;
    align-items: flex-start;
    transition: top 0.2s ease-in;
    top: ${({ panel }) => (panel ? '140%' : '-350%')};

    ::after {
      content: '';
      right: 0;
      top: -2rem;
      position: absolute;
      border: 1rem solid transparent;
      border-bottom: 1rem solid rgba(0, 0, 0, 0.3); 
    }*/
`;

const Dashboard = () => {
  const auth = useSelector(selectAuth);
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const { panel } = useSelector(selectNavbar);

  useEffect(() => {
    !auth.login && navigator('/login', { replace: true });
  }, [auth, navigator]);

  useEffect(() => {
    dispatch(getAllRegisterAsync());
  }, [dispatch]);

  const handlePanel = (e) => {
    e.stopPropagation();
    dispatch(clesedPanel());
  };

  return (
    <>
      <LayautMain>
        <PanelComponent panel={panel} onClick={handlePanel}>
          <PanelInfo />
        </PanelComponent>
        <Navbar />
        <ContentComponent />
        <FooterComponent />
      </LayautMain>
    </>
  );
};

export default Dashboard;
