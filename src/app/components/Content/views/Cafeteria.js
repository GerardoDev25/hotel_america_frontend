import moment from 'moment';
import { Typography, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { selectWhereCafe } from '../../../redux/reducers/cafe';
import { getWhereCafeAsync } from '../../../redux/ActionsAsync/cafeAA';
import { capitalizeWorlds } from '../../../helpers';

const Container = styled.div`
  height: 100%;
`;

const Main = styled.div`
  height: auto;
  max-height: 95%;
  overflow: auto;
`;

const Title = styled(Typography.Title)``;

const Rows = ({ items }) => {
  const columns = [
    {
      title: 'index',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Number Room',
      dataIndex: 'numberRoom',
      key: 'numberRoom',
    },
    {
      title: 'Breakfast',
      dataIndex: 'active',
      key: 'active',
      render: (active) => <Tag color={active ? 'blue' : 'error'}>{active ? 'enabled' : 'disabled'}</Tag>,
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log({ selectedRowKeys, selectedRows });
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };

  const Demo = () => {
    const [selectionType] = useState('checkbox');
    return (
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={items}
        pagination={false}
      />
    );
  };

  return <Demo />;
};

const Cafeteria = () => {
  const dispatch = useDispatch();

  const { data } = useSelector(selectWhereCafe);
  const { rows = [] } = data;

  const items = rows.map((item, index) => ({
    key: index + 1,
    active: item.active,
    name: capitalizeWorlds(item.name),
    numberRoom: item.numberRoom,
  }));

  useEffect(() => {
    const where = { date: moment().format('L') };
    dispatch(getWhereCafeAsync(where));
  }, [dispatch]);

  return (
    <Container>
      <Title>Cafeteria</Title>
      <Main>
        <Rows items={items} />
      </Main>
    </Container>
  );
};

export default Cafeteria;
