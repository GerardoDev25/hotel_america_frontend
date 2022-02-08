import { Pagination } from 'antd';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { getAllRoomAsync } from '../../redux/ActionsAsync/roomAA';
const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem !important;
`;

const PaginatorStyled = styled(Pagination)`
  background-color: #ccc;
  padding: 5px;
  padding-left: 3rem;
  padding-right: 3rem;
  border-radius: 0.4rem;
`;

const PaginationComponent = ({ total, type }) => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(getAllRoomAsync(e));
  };
  console.log(type);
  return (
    <Container>
      <PaginatorStyled defaultCurrent={1} total={total} onChange={handleChange} size="default" />
    </Container>
  );
};

export default PaginationComponent;
