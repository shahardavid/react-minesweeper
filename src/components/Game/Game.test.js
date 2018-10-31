import React from 'react'
import {shallow, mount} from 'enzyme'
import Game from "./Game";
import {createNewGameObject} from "./game-logic";

it('renders without crashing', () => {
  shallow(<Game />);
});

describe('<Game>', () => {
  const mines = 1;
  let wrapper;
  const handleGameBoardCellClick = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<Game/>);
    const gameState = createNewGameObject(2, 1, mines);
    const gameBoard = gameState.gameBoard;
    gameBoard[0][0].isMine = true;
    gameBoard[0][1].isMine = false;
    wrapper.setState({...gameState})
  })

  it('should change state to win on flag all mines', () => {
    wrapper.instance().handleGameBoardCellClick(0, 0, true);
    expect(wrapper.state().isWin).toEqual(true);
    expect(wrapper.state().gameBoard[0][0].isRevealed).toEqual(true);
    expect(wrapper.state().gameBoard[0][1].isRevealed).toEqual(true);
  });

  it('should change state to lose on reveal a mine', () => {
    wrapper.instance().handleGameBoardCellClick(0, 0, false);
    expect(wrapper.state().isLose).toEqual(true);
    expect(wrapper.state().gameBoard[0][0].isRevealed).toEqual(true);
    expect(wrapper.state().gameBoard[0][1].isRevealed).toEqual(true);
  });

  it('should not reveal a flagged cell', () => {
    wrapper.instance().handleGameBoardCellClick(0, 1, true);
    wrapper.instance().handleGameBoardCellClick(0, 1, false);
    expect(wrapper.state().gameBoard[0][1].isRevealed).toEqual(false);
  });

  it('should un-flagged a flagged cell', () => {
    wrapper.instance().handleGameBoardCellClick(0, 1, true);
    wrapper.instance().handleGameBoardCellClick(0, 1, true);
    expect(wrapper.state().gameBoard[0][1].isFlagged).toEqual(false);
  });

  it('should not flag a cell on flags limit reached', () => {
    wrapper.instance().handleGameBoardCellClick(0, 1, true);
    wrapper.instance().handleGameBoardCellClick(0, 0, true);
    expect(wrapper.state().gameBoard[0][0].isFlagged).toEqual(false);
  });

})