import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 20px;
  color: ${({isWin}) => isWin? 'blue' : 'red'}
`

const GameOver = ({isWin, isLose}) => {
  return (
    <Container isWin={isWin}>
      {isWin? 'WIN' : (isLose? 'LOSE' : '\u00a0')}
    </Container>
  );
};

export default GameOver;