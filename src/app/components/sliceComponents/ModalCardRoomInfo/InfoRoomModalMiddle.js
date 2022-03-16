import React from 'react';
import styled from 'styled-components';
import { Typography, Table, Empty, Button } from 'antd';

import { midlleQuery } from '../../../helpers/settings';
import { PlusOutlined } from '@ant-design/icons';

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

const HeadleContainer = styled.div`
  width: 100%;
  height: auto;
  background-color: #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.5%;
  padding-right: 0.5%;
`;

const TitleContent = styled(Title)`
  height: 2rem;
  padding-bottom: 0.5rem;
  text-decoration: underline;
`;

const InfoContent = styled.div`
  width: 100%;
  overflow: auto;
  height: calc(100% - 2.5rem);
`;

const InfoRoomModalMiddle = ({ columns, items, msg, ok, title, addNew }) => {
  //

  return (
    <MainContent>
      {!ok ? (
        <Empty description={msg} />
      ) : (
        <>
          {
            <HeadleContainer>
              <TitleContent level={4} type="secondary">
                {title}
              </TitleContent>
              {addNew && (
                <Button onClick={addNew} type="link" icon={<PlusOutlined />}>
                  Add
                </Button>
              )}
            </HeadleContainer>
          }
          <InfoContent>
            <Table dataSource={items} columns={columns} pagination={false} size="small" />
          </InfoContent>
        </>
      )}
    </MainContent>
  );
};

export default InfoRoomModalMiddle;
