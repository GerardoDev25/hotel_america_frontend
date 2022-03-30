import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { midlleQuery, roles } from '../../helpers/settings';
import { capitalizeWorlds, cleanLocalStorage } from '../../helpers';

import { selectAuth } from '../../redux/reducers/auth';
import { selectNavbar, clesedPanel } from '../../redux/reducers/navbar';

const MainContainer = styled.div`
  width: 100%;
  z-index: 100;
  display: none;
  height: 100vh;
  padding: 2rem;
  padding-top: 5rem;
  position: absolute;
  border-radius: 1rem;
  transition: top 0.2s ease-in;
  background-color: transparent;
  top: ${({ panel }) => (panel ? '0%' : '-150%')};
  @media screen and (max-width: ${midlleQuery}) {
    display: block;
  }
`;

const PanelInfo = styled.div`
  width: 20rem;
  height: 15rem;
  display: grid;
  margin-left: auto;
  margin-right: auto;
  border-radius: 1rem;
  grid-template-rows: 2fr 1fr;
  transition: top 0.2s ease-in;
  background-color: rgba(0, 0, 0, 0.7);
`;

const TopSecption = styled.div`
  padding: 2rem;
`;

const BottomSecption = styled.div`
  display: flex;
  padding-right: 2rem;
  align-items: center;
  justify-content: flex-end;
`;

const TitleComponent = styled(Typography.Title)`
  letter-spacing: 0.1rem;
  color: white !important;
`;

const ParagraphComponent = styled(Typography.Paragraph)`
  color: white;
`;

const ButtonComponent = styled(Button)`
  margin-right: 0 !important;
`;

const PanelComponent = () => {
  //

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { staff } = useSelector(selectAuth);
  const { panel } = useSelector(selectNavbar);

  const handleClosed = (e) => {
    e.stopPropagation();
    panel && dispatch(clesedPanel());
  };

  const handleClick = () => {
    cleanLocalStorage(dispatch, navigate, message);
  };

  return (
    <MainContainer onClick={handleClosed} panel={panel}>
      <PanelInfo>
        <TopSecption>
          <TitleComponent level={5}>{capitalizeWorlds(staff.name)}</TitleComponent>
          <ParagraphComponent>{roles[staff.role]}</ParagraphComponent>
        </TopSecption>
        <BottomSecption>
          <ButtonComponent type="primary" danger onClick={handleClick}>
            Logout
          </ButtonComponent>
        </BottomSecption>
      </PanelInfo>
    </MainContainer>
  );
};

export default PanelComponent;
