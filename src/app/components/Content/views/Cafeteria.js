import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Typography, Table, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { capitalizeWorlds } from '../../../helpers';
import { selectAuth } from '../../../redux/reducers/auth';
import { selectWhereCafe } from '../../../redux/reducers/cafe';

import { createCafeAsync, updateCafeAsync } from '../../../redux/ActionsAsync/cafeAA';
import { renewAsync } from '../../../redux/ActionsAsync/authAA';

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

  const dispatch = useDispatch();
  const [selectionType] = useState('checkbox');

  const items = rows.map((item, index) => ({
    key: index + 1,
    id: item.cafeId,
    active: item.active,
    name: capitalizeWorlds(item.name),
    numberRoom: item.numberRoom,
  }));

  const rowClassName = (record) => (record.active ? 'disble-colums' : '');

  const rowSelection = {
    onChange: (_, selectedRows) => {
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

const Cafeteria = () => {
  //

  const dispatch = useDispatch();

  const { token } = useSelector(selectAuth);
  const { data = {}, ok } = useSelector(selectWhereCafe);
  const { rows = [] } = data;

  useEffect(() => {
    dispatch(createCafeAsync(token));
  }, [dispatch, token]);

  const handleDispatch = () => {
    dispatch(renewAsync(token));
  };
  const handleClick = (e) => {
    localStorage.setItem(
      'auth',
      JSON.stringify({
        loading: false,
        login: true,
        staff: {
          staffId: '6216da3d3babf8c796d79924',
          role: 'role_Cafe',
          name: 'Marta Cafe',
          iat: 1647375893,
          exp: 1647404693,
        },
        local: 'true',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdGFmZklkIjoiNjIxNmRhM2QzYmFiZjhjNzk2ZDc5OTI0Iiwicm9sZSI6InJvbGVfQ2FmZSIsIm5hbWUiOiJNYXJ0YSBDYWZlIiwiaWF0IjoxNjQ3MzgzOTY3LCJleHAiOjE2NDc0MTI3Njd9.X5g7RGQfYUcv77uRo858JqWol1ldsGlKpye2HJ0MEFo',
        called: true,
      })
    );
  };

  return (
    <Container>
      <Title>Cafeteria</Title>
      {/* <button onClick={handleClick}>See</button>
      <button onClick={handleDispatch}>dispatch</button> */}
      <Main>{ok && <Rows rows={rows} token={token} />}</Main>
    </Container>
  );
};

export default Cafeteria;
