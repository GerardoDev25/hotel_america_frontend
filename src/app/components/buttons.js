import styled from 'styled-components';

const Test = styled.button`
  background-color: ${({ color }) => color || 'yellow'};
  width: 3rem;
  height: 2rem;
`;

const Buttons = { Test };

export default Buttons;
