import React from 'react'
import {shallow, mount} from 'enzyme'
import GameBoard from "./GameBoard";
import GameBoardCell from "./GameBoardCell";
import {createNewGameObject} from "../Game/game-logic";

it('renders without crashing', () => {
  shallow(<GameBoard board={[]}/>);
});

it('should call onCellClick event on click of a board cell', () =>{
  const handleCellClick = jest.fn();
  const gameBoard = createNewGameObject(1, 1, 1).gameBoard;
  const wrapper = mount(<GameBoard board={gameBoard} onCellClick={handleCellClick}/>);
  wrapper.find(GameBoardCell).first().simulate('click');
  expect(handleCellClick).toBeCalledWith(0, 0, false)
})