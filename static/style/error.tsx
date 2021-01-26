import styled from 'styled-components';

export const Container = styled.div`
  width: 360px;
  height: 600px;
  padding-top: 15%;
  margin: 0 auto;
  text-align: center;

  div {
    line-height: 25px;
    margin-top: 20px;

    .anticon {
      font-size: 24px;
      margin-right: 10px;
    }

    .go {
      padding: 6px 12px;
      background: #1abc9c;
      cursor: pointer;
      border-radius: 6px;
      color: #fff;
    }

    b {
      color: #1abc9c;
    }
  }
`;
