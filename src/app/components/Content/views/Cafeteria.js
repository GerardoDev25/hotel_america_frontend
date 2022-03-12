import moment from 'moment';
import styled from 'styled-components';
import { Typography, Table, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { capitalizeWorlds } from '../../../helpers';
import { selectAuth } from '../../../redux/reducers/auth';
import { selectWhereCafe } from '../../../redux/reducers/cafe';

import { getWhereCafeAsync, createCafeAsync, updateCafeAsync } from '../../../redux/ActionsAsync/cafeAA';

const Container = styled.div`
  height: 100%;
`;

const Main = styled.div`
  height: auto;
  max-height: 95%;
  overflow: auto;
`;

const Title = styled(Typography.Title)``;

const Rows = ({ rows, token }) => {
  //
  console.log({ rows, token });
  const dispatch = useDispatch();
  const [selectionType] = useState('checkbox');

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
      dataSource={rows}
      pagination={false}
    />
  );
};

const Cafeteria = () => {
  //

  let items = useRef();
  const dispatch = useDispatch();

  const { token } = useSelector(selectAuth);
  const { data, ok } = useSelector(selectWhereCafe);
  const { rows = [] } = data;

  useEffect(() => {
    if (ok && !rows.length) dispatch(createCafeAsync(token));
  }, [ok, rows, dispatch, token]);

  useEffect(() => {
    items.current = rows.map((item, index) => ({
      key: index + 1,
      id: item.cafeId,
      active: item.active,
      name: capitalizeWorlds(item.name),
      numberRoom: item.numberRoom,
    }));

    // console.log({ tems: items.current, rows });
  }, [rows]);

  useEffect(() => {
    const where = { date: moment().format('L') };
    dispatch(getWhereCafeAsync(where));
  }, [dispatch]);

  return (
    <Container>
      <Title>Cafeteria</Title>
      <Main>
        {ok && items.current && <Rows rows={items.current} token={token} />}
        {console.log(items)}
      </Main>
    </Container>
  );
};

export default Cafeteria;
