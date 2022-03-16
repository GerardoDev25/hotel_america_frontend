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

const MainContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ViewUsed = ({ registerId }) => {
  const dispatch = useDispatch();

  const { data: dataGoest = {}, msg: msgGoest, ok: okGoest } = useSelector(selectWhereGoest);
  const { data: dataAmount = {}, msg: msgAmount, ok: okAmount } = useSelector(selectWhereAmount);
  const { data: dataLodging = {}, msg: msgLodging, ok: okLodging } = useSelector(selectWhereLodging);

  const { rows: rowsGoest = [], total: totalGoest = 0 } = dataGoest;
  const { rows: rowsAmount = [], total: totalAmount = 0 } = dataAmount;
  const { rows: rowsLodging = [], total: totalLodging = 0 } = dataLodging;

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
    type: Number.parseInt(e.totalAmount) > 0 ? 'debt' : 'payment',
    descrition: e.description.length > 15 ? e.description.slice(0, 15) + '...' : e.description,
  }));

  const itemsLodging = rowsLodging.map((e, i) => ({
    key: i,
    n: i + 1,
    amount: e.amount,
    date: e.date,
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

  const columsLodging = [
    {
      title: 'N',
      dataIndex: 'n',
      key: 'n',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  useLayoutEffect(() => {
    if (registerId) {
      dispatch(getByIdRegisterAsync(registerId));
      dispatch(getWhereGoestAsync({ registerId, limit: 0 }));
      dispatch(getWhereAmountAsync({ registerId, limit: 0 }));
      dispatch(getWhereLodgingAsync({ registerId, limit: 0 }));
    }
  }, [registerId, dispatch]);

  return (
    <MainContainer>
      <InfoRoomModalTop />

      <InfoRoomModalMiddle
        columns={columsGoest}
        items={itemsGoest}
        msg={msgGoest}
        ok={okGoest}
        total={totalGoest}
        title="Goest List"
      />

      <InfoRoomModalMiddle
        columns={columsAmount}
        items={itemsAmount}
        msg={msgAmount}
        ok={okAmount}
        total={totalAmount}
        title="Amount List"
      />

      <InfoRoomModalMiddle
        columns={columsLodging}
        items={itemsLodging}
        msg={msgLodging}
        ok={okLodging}
        total={totalLodging}
        title="Lodging List"
      />

      <InfoRoomModalDown itemsGoest={itemsGoest} itemsAmount={itemsAmount} itemsLodging={itemsLodging} />
    </MainContainer>
  );
};

export default ViewUsed;
