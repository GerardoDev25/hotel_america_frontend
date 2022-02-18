import { Typography } from 'antd';
import styled from 'styled-components';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getWhereGoestAsync } from '../../../redux/ActionsAsync/goestAA';
import { getWhereAmountAsync } from '../../../redux/ActionsAsync/amountAA';
import { getByIdRegisterAsync } from '../../../redux/ActionsAsync/registerAA';

import { selectWhereGoest } from '../../../redux/reducers/goest';
import { selectWhereAmount } from '../../../redux/reducers/amount';
// import { selectCurrentRegister } from '../../../redux/reducers/register';

import InfoRoomModalTop from './InfoRoomModalTop';
import InfoRoomModalMiddle from './InfoRoomModalMiddle';

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
  margin-top: 1rem;
  border: 3px solid #ccc;
`;

const ViewUsed = ({ registerId }) => {
  const dispatch = useDispatch();
  // const register = useSelector(selectCurrentRegister);
  const { data: dataGoest = {}, msg: msgGoest, ok: okGoest } = useSelector(selectWhereGoest);
  const { data: dataAmount = {}, msg: msgAmount, ok: okAmount } = useSelector(selectWhereAmount);

  const { rows: rowsGoest = [], total: totalGoest = 0 } = dataGoest;
  const { rows: rowsAmount = [], total: totalAmount = 0 } = dataAmount;

  const itemsGoest = rowsGoest.map((e, i) => ({
    key: i,
    n: i + 1,
    ci: e.ci,
    city: e.city,
    home: e.home,
    phone: e.phone,
    numberRoom: e.numberRoom,
    name: `${e.name} ${e.lastName}`,
    origin: e.origin,
  }));

  const itemsAmount = rowsAmount.map((e, i) => ({
    key: i,
    n: i + 1,
    origin: e.role,
    totalAmount: Math.abs(Number.parseInt(e.totalAmount)),
    type: Number.parseInt(e.totalAmount) > 0 ? 'position' : 'payment',
    descrition: e.description.length > 15 ? e.description.slice(0, 15) + '...' : e.description,
  }));

  const columsGoest = [
    {
      title: 'N',
      dataIndex: 'n',
      key: 'n',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'C.I.',
      dataIndex: 'ci',
      key: 'ci',
    },
    {
      title: 'Home',
      dataIndex: 'home',
      key: 'home',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Number Room',
      dataIndex: 'numberRoom',
      key: 'numberRoom',
    },
    {
      title: 'Origin',
      dataIndex: 'origin',
      key: 'origin',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
  ];

  const columsAmount = [
    {
      title: 'N',
      dataIndex: 'n',
      key: 'n',
    },
    {
      title: 'Origin',
      dataIndex: 'origin',
      key: 'origin',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Descrition',
      dataIndex: 'descrition',
      key: 'descrition',
    },
  ];

  useLayoutEffect(() => {
    if (registerId) {
      dispatch(getByIdRegisterAsync(registerId));
      dispatch(getWhereGoestAsync({ registerId, limit: 0 }));
      dispatch(getWhereAmountAsync({ registerId, limit: 0 }));
    }
  }, [registerId, dispatch]);

  // console.log({ itemsAmount ,rowsAmount});

  return (
    <MainContainer>
      <InfoRoomModalTop />

      <InfoRoomModalMiddle columns={columsGoest} items={itemsGoest} msg={msgGoest} ok={okGoest} total={totalGoest} title="Goest List" />

      <InfoRoomModalMiddle columns={columsAmount} items={itemsAmount} msg={msgAmount} ok={okAmount} total={totalAmount} title="Amount List" />

      <InfoRoomModalBottom>
        <Title level={4} type="secondary">
          InfoRoomModalBottom
        </Title>
      </InfoRoomModalBottom>
    </MainContainer>
  );
};

export default ViewUsed;
