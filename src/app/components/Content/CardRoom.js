import { Card } from 'antd';
import styled from 'styled-components';

const CardComponent = styled(Card)`
  width: 200px;
  height: 200px;
  background-color: red;
  border-radius: 1rem;
`;

const CardRoom = () => {
  const { Meta } = Card;

  return (
    <CardComponent hoverable>
      <Meta title="Europe Street beat" description="www.instagram.com" />
    </CardComponent>
  );
};

export default CardRoom;
