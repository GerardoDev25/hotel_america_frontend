import styled from 'styled-components';
import { Typography, Table, Tag } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';

import { capitalizeWorlds } from '../../../helpers';
import { selectAuth } from '../../../redux/reducers/auth';
import { selectWhereCafe } from '../../../redux/reducers/cafe';

import { createCafeAsync, updateCafeAsync } from '../../../redux/ActionsAsync/cafeAA';

const Container = styled.div`
  height: 100%;
`;

const Main = styled.div`
  height: auto;
  max-height: 95%;
  overflow: auto;
`;

const Title = styled(Typography.Title)``;

// const Rows = ({ token }) => {
//   //

//   const { data = {} } = useSelector(selectWhereCafe);
//   const { rows = [] } = data;

//   useEffect(() => {
//     console.log(rows);
//   }, [rows]);

//   const dispatch = useDispatch();
//   const [selectionType] = useState('checkbox');

//   const items = rows.map((item, index) => ({
//     key: index + 1,
//     id: item.cafeId,
//     active: item.active,
//     name: capitalizeWorlds(item.name),
//     numberRoom: item.numberRoom,
//   }));

//   const rowClassName = (record) => (record.active ? 'disble-colums' : '');

//   const rowSelection = {
//     onChange: (_, selectedRows) => {
//       for (const item of selectedRows) {
//         if (item.active === false) {
//           dispatch(updateCafeAsync({ active: true, cafeId: item.id, token }));
//           item.active = true;
//         }
//       }
//     },
//     getCheckboxProps: (record) => ({
//       disabled: record.active === true,
//     }),
//   };

//   const columns = [
//     {
//       title: 'index',
//       dataIndex: 'key',
//       key: 'key',
//     },
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//     },
//     {
//       title: 'Number Room',
//       dataIndex: 'numberRoom',
//       key: 'numberRoom',
//     },
//     {
//       title: 'Breakfast',
//       dataIndex: 'active',
//       key: 'active',
//       render: (active) => <Tag color={active ? 'error' : 'blue'}>{active ? 'disabled' : 'enabled'}</Tag>,
//     },
//   ];

//   return (
//     <Table
//       rowSelection={{
//         type: selectionType,
//         ...rowSelection,
//       }}
//       rowClassName={rowClassName}
//       columns={columns}
//       dataSource={items}
//       pagination={false}
//     />
//   );
// };

// const Cafeteria = () => {
//   //

//   const dispatch = useDispatch();

//   const { token } = useSelector(selectAuth);
//   const { data = {}, ok, loading } = useSelector(selectWhereCafe);
//   const { rows = [] } = data;

//   // const [count, setCount] = useState(0);

//   // setTimeout(() => {
//   //   setCount(count + 1);
//   // }, 4000);

//   useEffect(() => {
//     dispatch(createCafeAsync(token));
//   }, [dispatch, token]);

//   const RowsComponent = useCallback(() => {
//     console.log(rows, loading);
//     return <Rows rows={rows} token={token} />;
//   }, [rows, token, loading]);

//   // console.log(ok, rows);

//   return (
//     <Container>
//       <Title>Cafeteria</Title>
//       {/* <Main>{ok && <Rows rows={rows} token={token} />}</Main> */}
//       <Main>{ok && <Rows token={token} />}</Main>
//       {/* <Main>{<Rows rows={rows} token={token} count={count} />}</Main> */}
//       {/* <Main>
//         <RowsComponent />
//       </Main> */}
//     </Container>
//   );
// };

// export default Cafeteria;



const Rows = ({ token }) => {
  //

  const { data = {} } = useSelector(selectWhereCafe);
  const { rows = [] } = data;

  useEffect(() => {
    console.log(rows);
  }, [rows]);

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
  const { data = {}, ok, loading } = useSelector(selectWhereCafe);
  const { rows = [] } = data;

  useEffect(() => {
    dispatch(createCafeAsync(token));
  }, [dispatch, token]);

  // *-----------------------------------------------------
  // *-----------------------------------------------------

  // const { data = {} } = useSelector(selectWhereCafe);
  // const { rows = [] } = data;

    // console.log(rows);
  // useEffect(() => {
  // }, [rows]);

  // const dispatch = useDispatch();
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

  const habdleClick = () => {
    console.log(data);
  };

  // *-----------------------------------------------------
  // *-----------------------------------------------------

  return (
    <Container>
      <Title>Cafeteria</Title>
      {/* <Main>{ok && <Rows token={token} />}</Main> */}
      <button onClick={habdleClick}>see</button>
      <Main>
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
      </Main>
    </Container>
  );
};

export default Cafeteria;
