import { Layout } from 'antd';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { clesedPanel } from '../../redux/reducers/navbar';
const { Footer } = Layout;

const FooterStyled = styled(Footer)`
  height: 7%;
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
