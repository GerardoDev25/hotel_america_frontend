import React, { useEffect, useState } from 'react';

import { Layout } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectAuth } from '../redux/reducers/auth';

import Navbar from '../components/Navbar';
import Content from '../components/Content';
import SiderComponent from '../components/Sider';

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const auth = useSelector(selectAuth);
  const navigator = useNavigate();

  useEffect(() => {
    !auth.login && navigator('/login', { replace: true });
  }, [auth, navigator]);

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <SiderComponent collapsed={collapsed} />
        <Layout className="site-layout">
          <Navbar collapsed={collapsed} handleCollapse={handleCollapse} />
          <Content />
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
