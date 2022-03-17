import { Button, Tag } from 'antd';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

export const itemsData = (allDataGoest, allDataAmount, allDataLodging) => {
  //

  const { data: dataGoest = {}, msg: msgGoest, ok: okGoest } = allDataGoest;
  const { data: dataAmount = {}, msg: msgAmount, ok: okAmount } = allDataAmount;
  const { data: dataLodging = {}, msg: msgLodging, ok: okLodging } = allDataLodging;

  const { rows: rowsGoest = [], total: totalGoest = 0 } = dataGoest;
  const { rows: rowsAmount = [], total: totalAmount = 0 } = dataAmount;
  const { rows: rowsLodging = [], total: totalLodging = 0 } = dataLodging;

  const itemsGoest = rowsGoest.map((e, i) => ({
    key: i,
    n: i + 1,
    ci: e.ci,
    ok: okGoest,
    city: e.city,
    home: e.home,
    msg: msgGoest,
    phone: e.phone,
    origin: e.origin,
    total: totalGoest,
    goestId: e.goestId,
    title: 'Goest List',
    numberRoom: e.numberRoom,
    name: `${e.name} ${e.lastName}`,
    add: function () {
      console.log('add goest');
    },
  }));

  const itemsAmount = rowsAmount.map((e, i) => ({
    key: i,
    n: i + 1,
    ok: okAmount,
    origin: e.type,
    msg: msgAmount,
    total: totalAmount,
    title: 'Amount List',
    amountId: e.amountId,
    totalAmount: Math.abs(Number.parseInt(e.totalAmount)),
    type: Number.parseInt(e.totalAmount) > 0 ? 'debt' : 'payment',
    descrition: e.description.length > 15 ? e.description.slice(0, 15) + '...' : e.description,
    add: function () {
      console.log('add amount');
    },
  }));

  const itemsLodging = rowsLodging.map((e, i) => ({
    key: i,
    n: i + 1,
    date: e.date,
    ok: okLodging,
    msg: msgLodging,
    amount: e.amount,
    total: totalLodging,
    title: 'Lodging List',
    lodgingId: e.lodgingId,
  }));

  return [itemsGoest, itemsAmount, itemsLodging];
};

export const columsData = (ActionsContainer) => {
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

  return [columsGoest, columsAmount, columsLodging];
};
