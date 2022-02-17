import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectCurrentRoom } from '../../../redux/reducers/room';
import InfoRoomModalTop from './InfoRoomModalTop';

const MainContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ViewFree = () => {
  const room = useSelector(selectCurrentRoom);

  console.log(room);

  return (
    <MainContainer>
      <InfoRoomModalTop />
    </MainContainer>
  );
};

export default ViewFree;
