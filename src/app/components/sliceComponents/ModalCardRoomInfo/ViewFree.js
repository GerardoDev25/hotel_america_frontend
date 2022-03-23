import styled from 'styled-components';
import InfoRoomModalTop from './InfoRoomModalTop';

const MainContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ViewFree = () => {
  return (
    <MainContainer>
      <InfoRoomModalTop />
    </MainContainer>
  );
};

export default ViewFree;
