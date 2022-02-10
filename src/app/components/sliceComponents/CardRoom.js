import styled from 'styled-components';
import { Card, Button, Typography } from 'antd';
import ModalCardRoomInfo from './ModalCardRoomInfo';
import { useState } from 'react';

const { Meta } = Card;
const { Paragraph } = Typography;

const CardComponent = styled(Card)`
  width: 250px;
  cursor: auto;
  height: 220px;
  padding-left: auto;
  border-radius: 1rem;
  background-color: ${({ status }) => {
    switch (status) {
      case 'used':
        return 'orange';

      case 'free':
        return 'green';

      default:
        return '#bbb';
    }
  }};
`;

const CardInfo = styled.div`
  width: 100%;
  height: 5rem;
  height: 7rem;
  color: white;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-rows: 4fr 2fr;
`;

const SectionTop = styled.div`
  margin-top: 1rem;
  align-self: flex-start;
  justify-self: flex-start;
  line-height: 0.35rem;
`;

const ParagraphText = styled(Paragraph)`
  text-transform: capitalize;
  color: white;
`;

const H2Text = styled.p`
  ::before {
    color: white;
    text-decoration: underline;
    font-size: 2.3rem;
    content: 'Disabled';
  }
`;

const Description = ({ status, kindOfRoom, maxGuest, registerId }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleClick = () => {
    setModalVisible(true);
  };

  switch (status) {
    case 'used':
      return (
        <CardInfo>
          {modalVisible && <ModalCardRoomInfo modalVisible={modalVisible} handleOk={handleOk} handleCancel={handleCancel} registerId={registerId} />}
          <SectionTop>
            <ParagraphText>
              <strong>Kind of Room: </strong>
              {kindOfRoom}
            </ParagraphText>
            <ParagraphText>
              <strong>Max Guest: </strong>
              {maxGuest}
            </ParagraphText>
          </SectionTop>
          <>
            <Button size="small" onClick={handleClick} type="text">
              Show more
            </Button>
          </>
        </CardInfo>
      );

    case 'free':
      return (
        <CardInfo>
          {modalVisible && <ModalCardRoomInfo modalVisible={modalVisible} handleOk={handleOk} handleCancel={handleCancel} registerId={registerId} />}
          <SectionTop>
            <ParagraphText>
              <strong>Kind of Room: </strong>
              {kindOfRoom}
            </ParagraphText>
            <ParagraphText>
              <strong>Max Guest: </strong>
              {maxGuest}
            </ParagraphText>
          </SectionTop>
          <>
            <Button size="small" onClick={handleClick} type="text">
              Show more
            </Button>
          </>
        </CardInfo>
      );

    default:
      return (
        <CardInfo>
          <>
            <H2Text />
          </>
          <>
            <Button size="small" disabled type="dashed">
              Show more
            </Button>
          </>
        </CardInfo>
      );
  }
};
const CardRoom = ({ room, ids = {} }) => {
  const { registerId = false } = ids;
  const { numberRoom, available, kindOfRoom, maxGuest } = room;
  const status = available && registerId ? 'used' : available && !registerId ? 'free' : 'disabled';

  return (
    <CardComponent title={`Room Number - ${numberRoom} (${status})`} hoverable={available} status={status}>
      <Meta description={<Description status={status} kindOfRoom={kindOfRoom} maxGuest={maxGuest} registerId={registerId} />} />
    </CardComponent>
  );
};

export default CardRoom;
