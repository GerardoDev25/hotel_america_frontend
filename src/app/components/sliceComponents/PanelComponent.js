import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { roles } from '../../helpers/settings';
import { capitalizeWorlds } from '../../helpers';
import { selectNavbar, clesedPanel } from '../../redux/reducers/navbar';

import { selectAuth, logout } from '../../redux/reducers/auth';

const MainContainer = styled.div`
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
  margin-right: auto;
  display: grid;
  grid-template-rows: 2fr 1fr;
  background-color: rgba(0, 0, 0, 0.7);

  border-radius: 1rem;
  transition: top 0.2s ease-in;
`;

const TopSecption = styled.div`
  padding: 2rem;
`;

const BottomSecption = styled.div`
  padding-right: 2rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const TitleComponent = styled(Typography.Title)`
  color: white !important;
  letter-spacing: 0.1rem;
`;

const ParagraphComponent = styled(Typography.Paragraph)`
  color: white;
`;

const ButtonComponent = styled(Button)`
  margin-right: 0 !important;
`;

const PanelComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { staff } = useSelector(selectAuth);
  const { panel } = useSelector(selectNavbar);

  const handleClosed = (e) => {
    e.stopPropagation();
    panel && dispatch(clesedPanel());
  };

  const handleClick = () => {
    dispatch(logout());
    navigate('/login', { replace: true });
    message.info('logged');
  };

  return (
    <MainContainer onClick={handleClosed} panel={panel}>
      <PanelInfo>
        <TopSecption>
          <TitleComponent level={5}>{capitalizeWorlds(staff.name)}</TitleComponent>
          <ParagraphComponent>{roles[staff.role]}</ParagraphComponent>
        </TopSecption>
        <BottomSecption>
          <ButtonComponent danger onClick={handleClick}>
            Logout
          </ButtonComponent>
        </BottomSecption>
      </PanelInfo>
    </MainContainer>
  );
};

export default PanelComponent;
