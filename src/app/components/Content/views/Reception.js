import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { selectRoom } from '../../../redux/reducers/room';
import { selectRegister } from '../../../redux/reducers/register';
import { getAllRoomAsync } from '../../../redux/ActionsAsync/roomAA';

import CardRoom from '../../buttons/CardRoom';
import PaginationComponent from '../../buttons/PaginationComponent';

const Main = styled.div`
  height: 100%;
  display: grid;
  border-radius: 1rem;
  overflow: hidden;
  grid-template-columns: 1fr;
  grid-template-rows: 12fr 1fr;
  border-radius: 1rem;
`;

const Container = styled.div`
  width: 100%;
  height: auto;
  max-height: 45rem;

  overflow-y: auto;
  background-color: #ccc;

  display: grid;
  align-items: center;
  justify-items: center !important;
  grid-auto-rows: 250px;
  grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
`;

const Reception = () => {
  // total, error, loading, msg, pageCount, ok

  const dispatch = useDispatch();
  const Room = useSelector(selectRoom);
  const Register = useSelector(selectRegister);

  useEffect(() => {
    dispatch(getAllRoomAsync());
  }, [dispatch]);

  const Rooms = () => {
    const RegisterIdArr = Array.from(Register.registers.map((e) => e.roomId));
    return Room.rooms.map((room) => <CardRoom key={room.roomId} room={room} roomId={RegisterIdArr.find((id) => id === room.roomId)} />);
  };

  return (
    <Main>
      <Container>{Room.rooms && Register.registers && <Rooms />}</Container>
      <PaginationComponent total={Room.total} type="room" />
    </Main>
  );
};

export default Reception;
