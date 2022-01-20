import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  
  width: ${({ width }) => (width ? width : '100%')};
  height: ${({ height }) => (height ? height : '100vh')};
`;
