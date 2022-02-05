import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Layout, Button, Typography, message } from 'antd';

import { logout, selectAuth } from '../../redux/reducers/auth';
import { capitalizeWorlds, getLetersInitials } from '../../helpers';
import { openPanel, selectNavbar, clesedPanel } from '../../redux/reducers/navbar';

const { Header } = Layout;
const { Paragraph, Title } = Typography;

const HeaderMain = styled(Header)`
  height: 7%;
  padding: 0;
  width: 100%;
  background-color: white;
`;

const NavContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1450px;
  margin-left: auto;
  margin-right: auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    position: relative;
  }
`;

const NavContainerLeft = styled.div`
  width: 30%;
  height: 100%;
  max-width: 300px;
  background-color: #999;
`;

const NavContainerRight = styled.div`
  width: 60%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    right: 1rem;
    z-index: 10;
    width: 15rem;
    height: 10rem;
    cursor: pointer;
    padding: 1.5rem;
    position: absolute;
    flex-direction: column;
    align-items: flex-start;
    transition: top 0.2s ease-in;
    background-color: rgba(0, 0, 0, 0.3);
    top: ${({ panel }) => (panel ? '140%' : '-300%')};

    ::after {
      content: '';
      right: 0;
      top: -2rem;
      position: absolute;
      border: 1rem solid transparent;
      border-bottom: 1rem solid rgba(0, 0, 0, 0.3);
    }
  }
`;

const InfoContainer = styled.div`
  width: 65%;
  height: 100%;
  line-height: 0.7;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoutContainer = styled.div`
  width: 30%;
  height: 100%;
  line-height: 0.7;

  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 600px) {
    align-self: flex-end;
  }
`;

const InfoContainerLeft = styled.div`
  width: 65%;
  height: 100%;

  @media screen and (max-width: 600px) {
    width: 100%;
    color: white;
  }
`;

const InfoContainerRight = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const TitleComponent = styled(Title)`
  @media screen and (max-width: 600px) {
    color: white !important;
  }
`;

const ParagraphComponent = styled(Paragraph)`
  @media screen and (max-width: 600px) {
    color: white;
  }
`;
const AvatarContainer = styled(Avatar)`
  background-color: red;
`;

const AvatarContainerMedia = styled(Avatar)`
  display: none;
  cursor: pointer;
  margin-right: 1rem;
  background-color: gray;
  @media screen and (max-width: 600px) {
    display: block;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { staff } = useSelector(selectAuth);
  const { panel } = useSelector(selectNavbar);

  const roles = { role_admin: 'Admin', role_laundry: 'Laundry', role_reception: 'Reception', role_Cafeteria: 'Cafeteria' };

  const handlePanelOpen = (e) => {
    e.stopPropagation();
    panel ? dispatch(clesedPanel()) : dispatch(openPanel());
  };

  const handlePanelClose = () => {
    panel && dispatch(clesedPanel());
  };

  const handleClick = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
    message.info('logged');
  };
  return (
    <HeaderMain onClick={handlePanelClose}>
      <NavContainer>
        <NavContainerLeft>logo</NavContainerLeft>
        <NavContainerRight panel={panel}>
          <InfoContainer>
            <InfoContainerLeft>
              <TitleComponent level={5}>{capitalizeWorlds(staff.name)}</TitleComponent>
              <ParagraphComponent>{roles[staff.role]}</ParagraphComponent>
            </InfoContainerLeft>
            <InfoContainerRight>
              <AvatarContainer size={60}>{getLetersInitials(staff.name)}</AvatarContainer>
            </InfoContainerRight>
          </InfoContainer>
          <LogoutContainer>
            <Button danger onClick={handleClick}>
              Logout
            </Button>
          </LogoutContainer>
        </NavContainerRight>
        <AvatarContainerMedia size={50} onClick={handlePanelOpen}>
          {getLetersInitials(staff.name)}
        </AvatarContainerMedia>
      </NavContainer>
    </HeaderMain>
  );
};

export default Navbar;
