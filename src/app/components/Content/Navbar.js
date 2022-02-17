import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Layout, Button, Typography, message } from 'antd';

import { midlleQuery, roles } from '../../helpers/settings';
import { logout, selectAuth } from '../../redux/reducers/auth';
import { capitalizeWorlds, getLetersInitials } from '../../helpers';
import { openPanel, selectNavbar } from '../../redux/reducers/navbar';

import { cheanRoom } from '../../redux/reducers/room';
import { cheanGoest } from '../../redux/reducers/goest';
import { cheanStaff } from '../../redux/reducers/staff';
import { cheanAmount } from '../../redux/reducers/amount';
import { cheanRegister } from '../../redux/reducers/register';

const { Header } = Layout;
const { Paragraph, Title } = Typography;

const HeaderMain = styled(Header)`
  height: 7%;
  padding: 0;
  width: 100%;
  overflow: hidden;
  max-width: 1450px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5px;
  background-color: #ccc;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const NavContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: ${midlleQuery}) {
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

  @media screen and (max-width: ${midlleQuery}) {
    display: none;
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

  @media screen and (max-width: ${midlleQuery}) {
    align-self: flex-end;
  }
`;

const InfoContainerLeft = styled.div`
  width: 65%;
  height: 100%;

  @media screen and (max-width: ${midlleQuery}) {
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
  @media screen and (max-width: ${midlleQuery}) {
    display: none;
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
  @media screen and (max-width: ${midlleQuery}) {
    display: block;
  }
`;

const Navbar = () => {
  //

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { staff } = useSelector(selectAuth);
  const { panel } = useSelector(selectNavbar);

  const handlePanelOpen = (e) => {
    e.stopPropagation();
    !panel && dispatch(openPanel());
  };

  const handleClick = () => {
    dispatch(logout());
    dispatch(cheanRoom());
    dispatch(cheanGoest());
    dispatch(cheanStaff());
    dispatch(cheanAmount());
    dispatch(cheanRegister());
    navigate('/login', { replace: true });
    message.info('logged');
  };

  return (
    <HeaderMain>
      <NavContainer>
        <NavContainerLeft>logo</NavContainerLeft>
        <NavContainerRight panel={panel}>
          <InfoContainer>
            <InfoContainerLeft>
              <Title level={5}>{capitalizeWorlds(staff.name)}</Title>
              <Paragraph>{roles[staff.role]}</Paragraph>
            </InfoContainerLeft>
            <InfoContainerRight>
              <AvatarContainer size={45}>{getLetersInitials(staff.name)}</AvatarContainer>
            </InfoContainerRight>
          </InfoContainer>
          <LogoutContainer>
            <Button danger onClick={handleClick}>
              Logout
            </Button>
          </LogoutContainer>
        </NavContainerRight>
        <AvatarContainerMedia size={45} onClick={handlePanelOpen}>
          {getLetersInitials(staff.name)}
        </AvatarContainerMedia>
      </NavContainer>
    </HeaderMain>
  );
};

export default Navbar;
