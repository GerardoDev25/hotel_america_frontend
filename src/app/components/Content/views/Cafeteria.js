import moment from 'moment';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Typography, Table, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { capitalizeWorlds } from '../../../helpers';
import { selectAuth } from '../../../redux/reducers/auth';
import { selectWhereCafe } from '../../../redux/reducers/cafe';

import { getWhereCafeAsync, updateCafeAsync } from '../../../redux/ActionsAsync/cafeAA';

const Container = styled.div`
  height: 100%;
`;

const Main = styled.div`
  height: auto;
  max-height: 95%;
  overflow: auto;
`;

const Title = styled(Typography.Title)``;

const Cafeteria = () => {
  //

  const dispatch = useDispatch();

  const [selectionType] = useState('checkbox');
  const { token } = useSelector(selectAuth);
  const { data } = useSelector(selectWhereCafe);
  const { rows = [] } = data;

  const items = rows.map((item, index) => ({
    key: index + 1,
    id: item.cafeId,
    active: item.active,
    name: capitalizeWorlds(item.name),
    numberRoom: item.numberRoom,
  }));

  useEffect(() => {
    const where = { date: moment().format('L') };
    dispatch(getWhereCafeAsync(where));
  }, [dispatch]);

  const Rows = () => {
    //

    const rowClassName = (record) => (record.active ? 'disble-colums' : '');
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        for (const item of selectedRows) {
          if (item.active === false) {
            dispatch(updateCafeAsync({ active: true, cafeId: item.id, token }));
            item.active = true;
          }
        }
      },
      getCheckboxProps: (record) => ({
        disabled: record.active === true,
      }),
    };

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
        render: (active) => <Tag color={active ? 'error' : 'blue'}>{active ? 'disabled' : 'enabled'}</Tag>,
      },
    ];

    return (
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        rowClassName={rowClassName}
        columns={columns}
        dataSource={items}
        pagination={false}
      />
    );
  };

  return (
    <Container>
      <Title>Cafeteria</Title>
      <Main>
        <Rows />
      </Main>
    </Container>
  );
};

export default Cafeteria;
