import React from 'react'
import {shallow} from 'enzyme'
import GameBoardCell from "./GameBoardCell";

it('renders without crashing', () => {
  shallow(<GameBoardCell />);
});