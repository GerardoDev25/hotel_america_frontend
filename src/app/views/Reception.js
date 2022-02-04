import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectRoom } from '../redux/reducers/room';
import { getAllRoomAsync } from '../redux/ActionsAsync/roomAA';

import CardRoom from '../components/Content/CardRoom';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-self: center;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: stretch;
`;

const Reception = () => {
  const dispatch = useDispatch();
  const rooms = useSelector(selectRoom);

  useEffect(() => {
    console.log({ rooms });
  }, [rooms]);

  useEffect(() => {
    dispatch(getAllRoomAsync());
  }, [dispatch]);

  return (
    <Container>
      <CardRoom />
      <CardRoom />
      <CardRoom />
      <CardRoom />
      <CardRoom />
      <CardRoom />
      <CardRoom />
      <CardRoom />
      <CardRoom />
      <CardRoom />
      <CardRoom />
      <CardRoom />
      <CardRoom />
      <CardRoom />
      <CardRoom />
      <CardRoom />
    </Container>
  );
};

export default Reception;
