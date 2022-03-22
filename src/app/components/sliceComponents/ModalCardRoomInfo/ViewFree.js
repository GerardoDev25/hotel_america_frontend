import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectGetByIdRoom } from '../../../redux/reducers/room';
import InfoRoomModalTop from './InfoRoomModalTop';

const MainContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ViewFree = () => {
  const room = useSelector(selectGetByIdRoom);

  return (
    <MainContainer>
      <InfoRoomModalTop />
    </MainContainer>
  ); 
};

export default ViewFree;
