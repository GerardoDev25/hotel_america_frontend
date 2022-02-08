import { Layout } from 'antd';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { clesedPanel } from '../../redux/reducers/navbar';
const { Footer } = Layout;

const FooterStyled = styled(Footer)`
  height: 7%;
  width: 100%;
  max-width: 1450px;
  margin-left: auto;
  margin-right: auto;
  background-color: #ccc;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const FooterComponent = () => {
  const dispach = useDispatch();

  const handleClick = () => {
    dispach(clesedPanel());
  };

  return (
    <FooterStyled onClick={handleClick}>
      <p style={{ textAlign: 'center' }}> Footer </p>
    </FooterStyled>
  );
};

export default FooterComponent;
