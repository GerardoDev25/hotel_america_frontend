import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { selectRoom } from '../../../redux/reducers/room';
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
  const dispatch = useDispatch();
  const { rooms, total, error, loading, msg, pageCount } = useSelector(selectRoom);

  useEffect(() => {
    dispatch(getAllRoomAsync());
  }, [dispatch]);

  return (
    <Main>
      <Container>{rooms && rooms.map((room) => <CardRoom key={room.roomId} room={room} />)}</Container>
      <PaginationComponent total={total} type="room" />
    </Main>
  );
};

export default Reception;
