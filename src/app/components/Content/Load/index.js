import styled from 'styled-components';
import { Spin, Typography } from 'antd';

import { selectLoad } from '../../../redux/reducers/load';
import { useSelector } from 'react-redux';

const Container = styled.div`
  height: 100vh;
  width: 100%;

  position: absolute;
  z-index: 10;

  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

const Paragraph = styled(Typography.Paragraph)`
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: underline;
  ::before {
    content: 'Loading wait please...';
  }
`;

const LoadComponent = () => {
  //

  const { visible } = useSelector(selectLoad);

  return (
    <Container visible={visible} className="animate__animated animate__fadeIn">
      <Spin size="large" />
      <Paragraph />
    </Container>
  );
};

export default LoadComponent;
