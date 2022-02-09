import { Card } from 'antd';
import styled from 'styled-components';

const CardComponent = styled(Card)`
  width: 250px;
  height: 220px;
  background-color: #bbb;
  border-radius: 1rem;
  padding-left: auto;
`;

const CardRoom = ({ room, roomId }) => {
  const { Meta } = Card;

  const { numberRoom, available } = room;

  const Description = () => {
    return roomId ? (
      <p style={{ backgroundColor: 'green', color: 'white', textAlign: 'center' }}>Ocupado</p>
    ) : (
      <p style={{ backgroundColor: 'red', color: 'white', textAlign: 'center' }}>Libre</p>
    );
  };

  return (
    <CardComponent hoverable={available}>
      <Meta title={`Room Number - ${numberRoom}`} description={<Description />} />
    </CardComponent>
  );
};

export default CardRoom;
