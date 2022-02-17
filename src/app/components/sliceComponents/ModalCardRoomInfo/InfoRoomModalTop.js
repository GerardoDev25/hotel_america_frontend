import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Typography, Col, Row, Empty } from 'antd';

import { selectCurrentRoom } from '../../../redux/reducers/room';

const { Title } = Typography;

const MainContainer = styled.section`
  width: 100%;
  display: flex;
  min-height: 5rem;
  border-radius: 0.5rem;
  background-color: #ddd;
  flex-direction: column;
  justify-content: space-between;
`;

const TitleStyled = styled(Title)`
  width: 100%;
  padding-top: 0.2rem;
  margin-bottom: 1rem;
  padding-left: 0.7rem;
  background-color: #bbb;
  margin-bottom: 0 !important;
  text-decoration: underline;
`;

const ParagraphComponent = styled.p`
  margin-bottom: 0;
  font-weight: bold;
`;

const ContainerInfo = styled.div`
  display: flex;
  height: calc(100% - 2.5rem);
`;

const RowComponent = styled(Row)`
  width: 100%;
  height: 100%;
`;

const RowChidlComponent = styled(Row)`
  padding: 0.5rem;
  outline: 2px solid white;
`;

const InfoRoomModalTop = () => {
  const { data, ok } = useSelector(selectCurrentRoom);

  const infoRoom = data[0];

  return (
    <MainContainer>
      {!ok ? (
        <Empty />
      ) : (
        <>
          <TitleStyled level={3} type="secondary">
            Room Information
          </TitleStyled>
          <ContainerInfo>
            <RowComponent>
              <Col span={12}>
                <RowChidlComponent>
                  <Col span={12}>
                    <ParagraphComponent>Availability:</ParagraphComponent>
                  </Col>
                  <Col span={12}>{infoRoom.available ? 'True' : 'False'}</Col>
                </RowChidlComponent>
                <RowChidlComponent>
                  <Col span={12}>
                    <ParagraphComponent>Double Bed:</ParagraphComponent>
                  </Col>
                  <Col span={12}>{infoRoom.doubleBed}</Col>
                </RowChidlComponent>
                <RowChidlComponent>
                  <Col span={12}>
                    <ParagraphComponent>Single Bed:</ParagraphComponent>
                  </Col>
                  <Col span={12}>{infoRoom.singleBed}</Col>
                </RowChidlComponent>
              </Col>
              <Col span={12}>
                <RowChidlComponent>
                  <Col span={12}>
                    <ParagraphComponent>Number Room:</ParagraphComponent>
                  </Col>
                  <Col span={12}>{infoRoom.numberRoom}</Col>
                </RowChidlComponent>
                <RowChidlComponent>
                  <Col span={12}>
                    <ParagraphComponent>Kind of Room:</ParagraphComponent>
                  </Col>
                  <Col span={12}>{infoRoom.kindOfRoom}</Col>
                </RowChidlComponent>
                <RowChidlComponent>
                  <Col span={12}>
                    <ParagraphComponent>Max Guest:</ParagraphComponent>
                  </Col>
                  <Col span={12}>{infoRoom.maxGuest}</Col>
                </RowChidlComponent>
              </Col>
            </RowComponent>
          </ContainerInfo>
        </>
      )}
    </MainContainer>
  );
};

export default InfoRoomModalTop;
