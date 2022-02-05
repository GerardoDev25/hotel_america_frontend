import { Layout } from 'antd';
import styled from 'styled-components';

const { Footer } = Layout;

const FooterStyled = styled(Footer)`
  height: 7%;
`;

const FooterComponent = () => {
  return (
    <FooterStyled>
      <p style={{ textAlign: 'center' }}> Footer </p>
    </FooterStyled>
  );
};

export default FooterComponent;
