import styled from 'styled-components';
import { Col, Row, Tag, Typography } from 'antd';
import { midlleQuery } from '../../../helpers/settings';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

const MainContainer = styled.section`
  width: 100%;
  display: flex;
  min-height: 5rem;
  margin-top: 1rem;
  border-radius: 0.5rem;
  background-color: #eee;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled(Typography.Title)`
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
  text-decoration: underline;
`;

const ContainerInfo = styled.div`
  display: flex;
  height: calc(100% - 2.5rem);
`;

const RowComponent = styled(Row)`
  width: 100%;
  height: 100%;
`;

const ColComponent = styled(Col)`
  @media screen and (max-width: ${midlleQuery}) {
    text-align: center;
  }
`;

const RowChidlComponent = styled(Row)`
  padding: 0.5rem;
  outline: 2px solid white;
`;

const RowChidlComponenttotal = styled(RowChidlComponent)`
  font-weight: bold;
  background-color: #ccc;
`;

const InfoRoomModalDown = ({ items }) => {
  let totalDebt = 0;
  let totalToPay = 0;
  let totalAmount = 0;
  let totalLodging = 0;
  let totalPayment = 0;

  const [, amount, lodging] = items;

  for (const item of lodging.data) {
    totalLodging += item.amount;
  }

  for (const item of amount.data) {
    item.type === 'payment' ? (totalPayment += item.totalAmount) : (totalDebt += item.totalAmount);
  }

  totalAmount = totalPayment - totalDebt;
  totalToPay = totalLodging + totalAmount;

  return (
    <MainContainer>
      <Title level={3} type="secondary">
        Total Lodging
      </Title>
      <ContainerInfo>
        <RowComponent>
          <Col span={12}>
            <RowChidlComponent>
              <Col span={12}>
                <ParagraphComponent>Total Debt</ParagraphComponent>
              </Col>
              <ColComponent span={12}>
                <Tag color={'red'}>
                  {<CaretDownOutlined />} {totalDebt}
                </Tag>
              </ColComponent>
            </RowChidlComponent>
            <RowChidlComponent>
              <Col span={12}>
                <ParagraphComponent>Total Payment</ParagraphComponent>
              </Col>
              <ColComponent span={12}>
                <Tag color={'green'}>
                  {<CaretUpOutlined />} {totalPayment}
                </Tag>
              </ColComponent>
            </RowChidlComponent>
          </Col>
          <Col span={12}>
            <RowChidlComponent>
              <Col span={12}>
                <ParagraphComponent>Total Amount</ParagraphComponent>
              </Col>
              <ColComponent span={12}>
                <Tag color={totalAmount < 0 ? 'red' : 'green'}>
                  {totalAmount < 0 ? <CaretDownOutlined /> : <CaretUpOutlined />} {totalAmount}
                </Tag>
              </ColComponent>
            </RowChidlComponent>
            <RowChidlComponent>
              <Col span={12}>
                <ParagraphComponent>Total Lodging</ParagraphComponent>
              </Col>
              <ColComponent span={12}>
                <Tag color={'green'}>
                  {<CaretUpOutlined />} {totalLodging}
                </Tag>
              </ColComponent>
            </RowChidlComponent>
          </Col>
          <Col span={24}>
            <RowChidlComponenttotal>
              <Col span={12}>
                <ParagraphComponent style={{ fontSize: '1rem' }}>Total to Pay</ParagraphComponent>
              </Col>
              <ColComponent span={12}>
                <Tag color={totalToPay < 0 ? 'red' : 'green'} style={{ fontSize: '.8rem' }}>
                  {totalToPay < 0 ? <CaretDownOutlined /> : <CaretUpOutlined />} {totalToPay}
                </Tag>
              </ColComponent>
            </RowChidlComponenttotal>
          </Col>
        </RowComponent>
      </ContainerInfo>
    </MainContainer>
  );
};

export default InfoRoomModalDown;
