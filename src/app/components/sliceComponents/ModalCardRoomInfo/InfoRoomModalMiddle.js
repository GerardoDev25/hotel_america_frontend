import React from 'react';
import styled from 'styled-components';
import { Typography, Table, Empty } from 'antd';

import { midlleQuery } from '../../../helpers/settings';

const { Title } = Typography;

const MainContent = styled.section`
  width: 100%;
  display: flex;
  margin-top: 1rem;
  min-height: 5rem;
  max-height: 20rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  flex-direction: column;
  outline: 1px dotted black;
  width: calc(50% - .5rem);
  @media screen and (max-width: ${midlleQuery}) {
    width: 100%;
    margin-bottom: 0;
  }
`;

const TitleContent = styled(Title)`
  height: 2rem;
  padding-left: 0.5rem;
  background-color: #ccc;
  padding-bottom: 0.5rem;
  text-decoration: underline;
`;

const InfoContent = styled.div`
  width: 100%;
  overflow: auto;
  height: calc(100% - 2.5rem);
`;

const InfoRoomModalMiddle = ({ columns, items, msg, ok, title }) => {
  return (
    <MainContent>
      {!ok ? (
        <Empty description={msg} />
      ) : (
        <>
          <TitleContent level={4} type="secondary">
            {title}
          </TitleContent>
          <InfoContent>
            <Table dataSource={items} columns={columns} pagination={false} />
          </InfoContent>
        </>
      )}
    </MainContent>
  );
};

export default InfoRoomModalMiddle;
