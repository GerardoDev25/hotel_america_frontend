import React from 'react';
import styled from 'styled-components';
import { midlleQuery } from '../../../helpers/settings';
import { Typography, Table, Empty } from 'antd';
import { useSelector } from 'react-redux';
import { selectWhereGoest } from '../../../redux/reducers/goest';
import { selectWhereAmount } from '../../../redux/reducers/amount';

const { Title } = Typography;

const MainContent = styled.section`
  overflow: auto;
  margin-top: 1rem;
  min-height: 5rem;
  max-height: 10rem;
  margin-bottom: 1rem;
  width: calc(50% - 0.7rem);
  outline: 1px dotted black;
  @media screen and (max-width: ${midlleQuery}) {
    width: 100%;
    margin-top: 0;
  }
`;

const TitleContent = styled(Title)`
  background-color: #ccc;
  padding-bottom: 0.5rem;
  text-decoration: underline;
`;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];
const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

export const MiddleContainerLeft = () => {
  const { data = {}, msg, ok } = useSelector(selectWhereGoest);
  const { rows = [], total = 0 } = data;
  
  const items = rows.map((e) => ({
    name: `${e.name} ${e.lastName}`,
    ci: e.ci,
    home: e.home,
    phone: e.phone,
    numberRoom: e.numberRoom,
    posting: `${e.origin} -> ${e.posting}`,
    city: e.city,
  }));

  console.log({ items, total });

  return (
    <MainContent>
      {!ok ? (
        <Empty description={msg} />
      ) : (
        <>
          <TitleContent level={4} type="secondary">
            MiddleContainerLeft
          </TitleContent>
          <Table dataSource={dataSource} columns={columns} />
        </>
      )}
    </MainContent>
  );
};

export const MiddleContainerRight = () => {
  const { data, msg, ok } = useSelector(selectWhereAmount);

  const { rows = [], total = 0 } = data;
  console.log({ rows, total });

  // amountId: "620c04c9e6c29aef142c7a14"
  // description: "description 6"
  // registerId: "620315e800e76a274fcba733"
  // role: "frigobar"
  // staffId: "61f1d5e9742a3abde5acbce8"
  // totalAmount: 60

  return (
    <MainContent>
      {!ok ? (
        <Empty description={msg} />
      ) : (
        <>
          <TitleContent level={4} type="secondary">
            MainContaintRight
          </TitleContent>
          <Table dataSource={dataSource} columns={columns} />{' '}
        </>
      )}
    </MainContent>
  );
};
