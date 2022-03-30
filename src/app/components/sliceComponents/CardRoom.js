import { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Card, Button, Typography } from 'antd';

import ModalCardRoomInfo from './ModalCardRoomInfo';

import { cleanByIdRoom } from '../../redux/reducers/room';
import { cleanByIdRegister } from '../../redux/reducers/register';

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
  line-height: 0.35rem;
  align-self: flex-start;
  justify-self: flex-start;
`;

const ParagraphText = styled(Paragraph)`
  color: white;
  text-transform: capitalize;
`;

const H2Text = styled.p`
  ::before {
    color: white;
    font-size: 2.3rem;
    content: 'Disabled';
    text-decoration: underline;
  }
`;

const Description = ({ status, kindOfRoom, maxGuest, ids }) => {
  //

  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const handleOk = () => {
    dispatch(cleanByIdRegister());
    dispatch(cleanByIdRoom());
    setModalVisible(false);
  };
  const handleOpenModal = () => setModalVisible(true);

  switch (status) {
    case 'used':
      return (
        <CardInfo>
          {modalVisible && (
            <ModalCardRoomInfo
              //
              ids={ids}
              setModalVisible={setModalVisible}
              handleOk={handleOk}
              modalVisible={modalVisible}
            />
          )}
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
            <Button size="small" onClick={handleOpenModal} type="text">
              Show more
            </Button>
          </>
        </CardInfo>
      );

    case 'free':
      return (
        <CardInfo>
          {modalVisible && <ModalCardRoomInfo modalVisible={modalVisible} handleOk={handleOk} ids={ids} />}
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
            <Button size="small" onClick={handleOpenModal} type="text">
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
  //

  const { registerId = false } = ids;
  const { numberRoom, available, kindOfRoom, maxGuest, roomId } = room;
  const status = available && registerId ? 'used' : available && !registerId ? 'free' : 'disabled';

  return (
    <CardComponent
      status={status}
      hoverable={available}
      className="animate__animated animate__fadeIn"
      title={`Room Number - ${numberRoom} (${status})`}
    >
      <Meta
        description={<Description status={status} kindOfRoom={kindOfRoom} maxGuest={maxGuest} ids={{ registerId, roomId }} />}
      />
    </CardComponent>
  );
};

export default CardRoom;
