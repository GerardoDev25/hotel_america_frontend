import styled from 'styled-components';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getWhereGoestAsync } from '../../../redux/ActionsAsync/goestAA';
import { getWhereAmountAsync } from '../../../redux/ActionsAsync/amountAA';
import { getWhereLodgingAsync } from '../../../redux/ActionsAsync/lodgingAA';
import { getByIdRegisterAsync } from '../../../redux/ActionsAsync/registerAA';

import { selectWhereGoest } from '../../../redux/reducers/goest';
import { selectWhereAmount } from '../../../redux/reducers/amount';
import { selectWhereLodging } from '../../../redux/reducers/lodging';

import InfoRoomModalTop from './InfoRoomModalTop';
import InfoRoomModalDown from './InfoRoomModalDown';
import InfoRoomModalMiddle from './InfoRoomModalMiddle';
import { itemsData, columsData } from './viewUsedData';

const MainContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ActionsContainer = styled.div`
  width: 10rem;
  display: flex;
  justify-content: space-between;
`;

const ViewUsed = ({ registerId }) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (registerId) {
      dispatch(getByIdRegisterAsync(registerId));
      dispatch(getWhereGoestAsync({ registerId, limit: 0 }));
      dispatch(getWhereAmountAsync({ registerId, limit: 0 }));
      dispatch(getWhereLodgingAsync({ registerId, limit: 0 }));
    }
  }, [registerId, dispatch]);

  const allDataGoest = useSelector(selectWhereGoest);
  const allDataAmount = useSelector(selectWhereAmount);
  const allDataLodging = useSelector(selectWhereLodging);

  const colums = columsData(ActionsContainer);
  const items = itemsData(allDataGoest, allDataAmount, allDataLodging);

  return (
    <MainContainer>
      <InfoRoomModalTop />

      {items.map(({ data, info }, index) => (
        <InfoRoomModalMiddle key={index} items={data} columns={colums[index]} info={info} />
      ))}

      <InfoRoomModalDown items={items} />
    </MainContainer>
  );
};

export default ViewUsed;
