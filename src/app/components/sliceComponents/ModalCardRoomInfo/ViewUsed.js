import { Button, Tag } from 'antd';
import styled from 'styled-components';
import { useLayoutEffect } from 'react';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
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

  const { data: dataGoest = {}, msg: msgGoest, ok: okGoest } = useSelector(selectWhereGoest);
  const { data: dataAmount = {}, msg: msgAmount, ok: okAmount } = useSelector(selectWhereAmount);
  const { data: dataLodging = {}, msg: msgLodging, ok: okLodging } = useSelector(selectWhereLodging);

  const { rows: rowsGoest = [], total: totalGoest = 0 } = dataGoest;
  const { rows: rowsAmount = [], total: totalAmount = 0 } = dataAmount;
  const { rows: rowsLodging = [], total: totalLodging = 0 } = dataLodging;

  // * handle add
  const andleAddNewGoest = (e) => {
    console.log('add new Goest');
  };

  const andleAddNewAmount = (e) => {
    console.log('add new Amount');
  };

  // * handle update
  const handleUpdateGoest = (id) => {
    console.log(id);
  };

  const handleUpdateAmount = (id) => {
    console.log(id);
  };

  const handleUpdateLodging = (id) => {
    console.log(id);
  };

  // * handle delete
  const handleDeleteGoest = (id) => {
    console.log(id);
  };

  const handleDeleteAmount = (id) => {
    console.log(id);
  };

  const handleDeleteLodging = (id) => {
    console.log(id);
  };

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
    goestId: e.goestId,
  }));

  const itemsAmount = rowsAmount.map((e, i) => ({
    key: i,
    n: i + 1,
    origin: e.role,
    totalAmount: Math.abs(Number.parseInt(e.totalAmount)),
    type: Number.parseInt(e.totalAmount) > 0 ? 'debt' : 'payment',
    descrition: e.description.length > 15 ? e.description.slice(0, 15) + '...' : e.description,
    amountId: e.amountId,
  }));

  const itemsLodging = rowsLodging.map((e, i) => ({
    key: i,
    n: i + 1,
    amount: e.amount,
    date: e.date,
    lodgingId: e.lodgingId,
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
    {
      title: 'Actions',
      dataIndex: 'goestId',
      key: 'goestId',
      render: (id) => (
        <ActionsContainer>
          <Button type="primary" onClick={() => handleUpdateGoest(id)}>
            update
          </Button>
          <Button danger type="primary" onClick={() => handleDeleteGoest(id)}>
            delete
          </Button>
        </ActionsContainer>
      ),
    },
  ];

  const columsAmount = [
    {
      title: 'N',
      dataIndex: 'n',
      key: 'n',
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
      render: (type) => (
        <Tag color={type === 'payment' ? 'green' : 'red'}>
          {type === 'payment' ? <CaretUpOutlined /> : <CaretDownOutlined />} {type}
        </Tag>
      ),
    },
    {
      title: 'Descrition',
      dataIndex: 'descrition',
      key: 'descrition',
    },
    {
      title: 'Actions',
      dataIndex: 'amountId',
      key: 'amountId',
      render: (id) => (
        <ActionsContainer>
          <Button type="primary" onClick={() => handleUpdateAmount(id)}>
            update
          </Button>
          <Button danger type="primary" onClick={() => handleDeleteAmount(id)}>
            delete
          </Button>
        </ActionsContainer>
      ),
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
    {
      title: 'Actions',
      dataIndex: 'lodgingId',
      key: 'lodgingId',
      render: (id) => (
        <ActionsContainer>
          <Button type="primary" onClick={() => handleUpdateLodging(id)}>
            update
          </Button>
          <Button danger type="primary" onClick={() => handleDeleteLodging(id)}>
            delete
          </Button>
        </ActionsContainer>
      ),
    },
  ];

  return (
    <MainContainer>
      <InfoRoomModalTop />

      <InfoRoomModalMiddle
        ok={okGoest}
        msg={msgGoest}
        title="Goest List"
        items={itemsGoest}
        total={totalGoest}
        columns={columsGoest}
        addNew={andleAddNewGoest}
      />

      <InfoRoomModalMiddle
        ok={okAmount}
        msg={msgAmount}
        title="Amount List"
        items={itemsAmount}
        total={totalAmount}
        columns={columsAmount}
        addNew={andleAddNewAmount}
      />

      <InfoRoomModalMiddle
        ok={okLodging}
        msg={msgLodging}
        title="Lodging List"
        items={itemsLodging}
        total={totalLodging}
        columns={columsLodging}
      />

      <InfoRoomModalDown itemsGoest={itemsGoest} itemsAmount={itemsAmount} itemsLodging={itemsLodging} />
    </MainContainer>
  );
};

export default ViewUsed;
