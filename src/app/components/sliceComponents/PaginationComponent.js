import { Pagination } from 'antd';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { getAllRoomAsync } from '../../redux/ActionsAsync/roomAA';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem !important;
`;

const PaginatorStyled = styled(Pagination)`
  padding: 5px;
  padding-left: 3rem;
  padding-right: 3rem;
  border-radius: 0.4rem;
  background-color: #ccc;
`;

const PaginationComponent = ({ total, type }) => {
  //

  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(getAllRoomAsync(e));
  };

  return (
    <Container>
      <PaginatorStyled defaultCurrent={1} total={total} onChange={handleChange} size="default" />
    </Container>
  );
};

export default PaginationComponent;
