import React from 'react';
import styled from 'styled-components';
import { Typography, Table, Empty } from 'antd';

import { midlleQuery } from '../../../helpers/settings';

const { Title } = Typography;

const MainContent = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;

  margin-top: 1rem;
  min-height: 5rem;
  max-height: 20rem;
  border-radius: 0.5rem;
  border: 3px solid #ddd;
  @media screen and (max-width: ${midlleQuery}) {
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

const InfoRoomModalDown = ({ columns, items, msg, ok, title }) => {
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
            <Table dataSource={items} columns={columns} pagination={false} size="small" />
          </InfoContent>
        </>
      )}
    </MainContent>
  );
};

export default InfoRoomModalDown;
