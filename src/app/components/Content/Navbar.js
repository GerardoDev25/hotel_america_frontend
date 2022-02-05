import styled from 'styled-components';
import { Layout } from 'antd';
// import { Avatar, Layout, Button, Typography, message } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

// import { capitalizeWorlds, getLetersInitials } from '../../helpers';

// import { logout, selectAuth } from '../../redux/reducers/auth';
import React from 'react';

const { Header } = Layout;

const HeaderMain = styled(Header)`
  width: 100%;
  height: 7%;
  background-color: white;

  /* display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  background-color: #888; */
`;

// const AvatarContainer = styled.div`
//   width: 50%;
//   max-width: 330px;
//   height: 100%;

//   background-color: white;
//   display: flex;
//   justify-content: space-space-around;
//   align-items: center;
// `;

// const SectionContainer = styled.div`
//   width: calc(100% - 50px);
//   height: 100%;
//   display: flex;
//   align-items: center;
//   background-color: black;
//   justify-content: space-between;
//   padding: 0 10px;
// `;

// const InfoContainer = styled.div`
//   width: 70%;
//   height: 100%;
//   display: flex;
//   align-items: flex-start;
//   justify-content: center;
//   flex-direction: column;
//   line-height: 0.7;
// `;

const Navbar = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { staff } = useSelector(selectAuth);

  // const { Paragraph, Title } = Typography;

  // const roles = { role_admin: 'Admin', role_laundry: 'Laundry', role_reception: 'Reception', role_Cafeteria: 'Cafeteria' };

  // const handleClick = () => {
  //   dispatch(logout());
  //   navigate('/login', { replace: true });
  //   message.info('logged');
  // };
  return (
    <HeaderMain>
      NavBar
      {/* <SectionContainer>
        <AvatarContainer>
          <InfoContainer>
            <Title level={5}> {capitalizeWorlds(staff.name)}</Title>
            <Paragraph>{roles[staff.role]}</Paragraph>
          </InfoContainer>
          <Avatar size={50} style={{ backgroundColor: 'red' }}>
            {getLetersInitials(staff.name)}
          </Avatar>
        </AvatarContainer>
        <Button danger onClick={handleClick}>
          Logout
        </Button>
      </SectionContainer> */}
    </HeaderMain>
  );
};

export default Navbar;
