import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectRoom } from '../../../redux/reducers/room';
import { getAllRoomAsync } from '../../../redux/ActionsAsync/roomAA';

// import CardRoom from '../components/buttons/CardRoom';

const Main = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: space-between; */

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 9fr 1fr;

  height: 100%;
`;
// const Foot = styled.div`
//   background-color: red;
//   height: 100%;
// `;

// const Container = styled.div`
//   width: 100%;
//   height: auto;
//   max-height: 45rem;

//   overflow-y: auto;
//   background-color: green;

//   display: grid;
//   align-items: center;
//   justify-items: center !important;
//   grid-auto-rows: 250px;
//   grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
// `;

const Reception = () => {
  const dispatch = useDispatch();
  const rooms = useSelector(selectRoom);

  useEffect(() => {
    console.log({ rooms: rooms.rooms });
  }, [rooms]);

  useEffect(() => {
    dispatch(getAllRoomAsync());
  }, [dispatch]);

  return (
    <Main>
      {/* <Container>
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
      <Foot> page</Foot> */}
    </Main>
  );
};

export default Reception;
