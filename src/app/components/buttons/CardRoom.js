import { Card } from 'antd';
import styled from 'styled-components';

const CardComponent = styled(Card)`
  width: 200px;
  height: 200px;
  background-color: #bbb;
  border-radius: 1rem;
  padding-left: auto;
`;

const CardRoom = ({ room }) => {
  const { Meta } = Card;

  const { numberRoom, available } = room;

  return (
    <CardComponent hoverable={available}>
      <Meta title={`Room Number - ${numberRoom}`} description="www.instagram.com" />
    </CardComponent>
  );
};

export default CardRoom;
