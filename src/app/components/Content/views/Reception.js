import { message } from 'antd';
import { useEffect } from 'react';
import { useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectAllRoom } from '../../../redux/reducers/room';
import { cheanRegister, selectAllRegister } from '../../../redux/reducers/register';

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

  const dispatch = useDispatch();
  const navigator = useNavigate();

  const { data: dataRoom = {} } = useSelector(selectAllRoom);
  const { data: dataRegister = {}, ok, msg, error } = useSelector(selectAllRegister);

  useEffect(() => {
    if (!ok && error) {
      console.log(error);
      message.error(msg);
      dispatch(cheanRegister);
      navigator('/login', { replace: true });
    }
  }, [dispatch, navigator, ok, error, msg]);

  const { rows: itemsRegisters = [] } = dataRegister;
  const { rows: itemsRooms = [], total: totalRoom } = dataRoom;

  useEffect(() => {
    dispatch(getAllRoomAsync());
  }, [dispatch]);

  const Rooms = useCallback(() => {
    const RegisterIdArr = Array.from(itemsRegisters.map((e) => ({ registerId: e.registerId, roomId: e.roomId })));

    return itemsRooms.map((room) => (
      <CardRoom key={room.roomId} room={room} ids={RegisterIdArr.find((e) => (e.roomId === room.roomId ? e : false))} />
    ));
  }, [itemsRegisters, itemsRooms]);

  return (
    <Main>
      <Container>{itemsRooms && itemsRegisters && <Rooms />}</Container>
      <PaginationComponent total={totalRoom} type="room" />
    </Main>
  );
};

export default Reception;
