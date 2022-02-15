/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { selectAllRoom } from '../../../redux/reducers/room';
import { selectAllRegister } from '../../../redux/reducers/register';
import { getAllRoomAsync } from '../../../redux/ActionsAsync/roomAA';

import CardRoom from '../../sliceComponents/CardRoom';
import PaginationComponent from '../../sliceComponents/PaginationComponent';

const Main = styled.div`
  height: 100%;
  overflow: hidden;
  border-radius: 1rem;
  border-radius: 1rem;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 12fr 1fr;
`;

const Container = styled.div`
  width: 100%;
  height: auto;
  overflow-y: auto;
  max-height: 45rem;
  background-color: #ccc;

  display: grid;
  align-items: center;
  grid-auto-rows: 250px;
  justify-items: center !important;
  grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
`;

const Reception = () => {
  //

  // total, error, loading, msg, pageCount, ok

  const dispatch = useDispatch();
  const {
    data: { rows: rooms, total: totalRoom },
  } = useSelector(selectAllRoom);
  const {
    data: { rows: registers },
  } = useSelector(selectAllRegister);

  useEffect(() => {
    dispatch(getAllRoomAsync());
  }, [dispatch]);

  const Rooms = useCallback(() => {
    const RegisterIdArr = Array.from(registers.map((e) => ({ registerId: e.registerId, roomId: e.roomId })));

    return rooms.map((room) => <CardRoom key={room.roomId} room={room} ids={RegisterIdArr.find((e) => (e.roomId === room.roomId ? e : false))} />);
  }, [registers, rooms]);

  return (
    <Main>
      <Container>{rooms && registers && <Rooms />}</Container>
      <PaginationComponent total={totalRoom} type="room" />
    </Main>
  );
};

export default Reception;
