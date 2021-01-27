import styled from 'styled-components';

export const Container = styled.div`
  margin: ${(props) => (props.position ? 'auto' : '20px auto')};
  width: 100%;
  text-align: center;
  border-top: 1px solid #00c4b6;
  padding-top: 30px;
  position: ${(props) => (props.position ? 'fixed' : 'initial')};
  bottom: ${(props) => (props.position ? 0 : 'auto')};
  background-color: #ffffff;
`;
