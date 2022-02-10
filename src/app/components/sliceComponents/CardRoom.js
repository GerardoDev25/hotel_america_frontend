import styled from 'styled-components';
import { Card, Button, Typography } from 'antd';

const { Meta } = Card;
const { Paragraph } = Typography;

const CardComponent = styled(Card)`
  width: 250px;
  cursor: auto;
  height: 220px;
  padding-left: auto;
  border-radius: 1rem;
  background-color: ${({ status }) => {
    switch (status) {
      case 'used':
        return 'orange';

      case 'free':
        return 'green';

      default:
        return '#bbb';
    }
  }};
`;

const CardInfo = styled.div`
  width: 100%;
  height: 5rem;
  height: 7rem;
  color: white;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-rows: 4fr 2fr;
`;

const SectionTop = styled.div`
  margin-top: 1rem;
  align-self: flex-start;
  justify-self: flex-start;
  line-height: 0.35rem;
`;

const ParagraphText = styled(Paragraph)`
  text-transform: capitalize;
  color: white;
`;

const H2Text = styled.h2`
  color: white;
  font-size: 2.3rem;
  text-decoration: underline;
  font-weight: bold;
`;

const CardRoom = ({ room, roomId }) => {
  const { numberRoom, available, kindOfRoom, maxGuest } = room;

  const status = available && roomId ? 'used' : available && !roomId ? 'free' : 'disable';

  const Description = () => {
    switch (status) {
      case 'used':
        return (
          <CardInfo>
            <SectionTop>
              <ParagraphText>
                <strong>Kind of Room: </strong>
                {kindOfRoom}
              </ParagraphText>
              <ParagraphText>
                <strong>Max Guest: </strong>
                {maxGuest}
              </ParagraphText>
            </SectionTop>
            <>
              <Button size="small">Show more</Button>
            </>
          </CardInfo>
        );

      case 'free':
        return (
          <CardInfo>
            <SectionTop>
              <ParagraphText>
                <strong>Kind of Room: </strong>
                {kindOfRoom}
              </ParagraphText>
              <ParagraphText>
                <strong>Max Guest: </strong>
                {maxGuest}
              </ParagraphText>
            </SectionTop>
            <>
              <Button size="small">Show more</Button>
            </>
          </CardInfo>
        );

      default:
        return (
          <CardInfo>
            <>
              <H2Text>Disable</H2Text>
            </>
            <>
              <Button size="small">Show more</Button>
            </>
          </CardInfo>
        );
    }
  };

  return (
    <CardComponent title={`Room Number - ${numberRoom} (${status})`} hoverable={available} status={status}>
      <Meta description={<Description />} />
    </CardComponent>
  );
};

export default CardRoom;
