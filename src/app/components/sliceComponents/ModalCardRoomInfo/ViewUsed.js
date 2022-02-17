import { Typography } from 'antd';
import styled from 'styled-components';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getWhereGoestAsync } from '../../../redux/ActionsAsync/goestAA';
import { getWhereAmountAsync } from '../../../redux/ActionsAsync/amountAA';
import { getByIdRegisterAsync } from '../../../redux/ActionsAsync/registerAA';

import { selectCurrentRegister } from '../../../redux/reducers/register';

import InfoRoomModalTop from './InfoRoomModalTop';
import { MiddleContainerLeft, MiddleContainerRight } from './InfoRoomModalMiddle';

const { Title } = Typography;

const MainContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const InfoRoomModalBottom = styled.section`
  width: 100%;
  outline: 1px dotted black;
`;

const ViewUsed = ({ registerId }) => {
  const dispatch = useDispatch();
  const register = useSelector(selectCurrentRegister);

  useLayoutEffect(() => {
    if (registerId) {
      dispatch(getByIdRegisterAsync(registerId));
      dispatch(getWhereGoestAsync({ registerId }));
      dispatch(getWhereAmountAsync({ registerId }));
    }
  }, [registerId, dispatch]);

  // console.log({ register });

  return (
    <MainContainer>
      <InfoRoomModalTop />
      <MiddleContainerLeft />
      <MiddleContainerRight />
      <InfoRoomModalBottom>
        <Title level={4} type="secondary">
          InfoRoomModalBottom
        </Title>
      </InfoRoomModalBottom>
    </MainContainer>
  );
};

export default ViewUsed;
