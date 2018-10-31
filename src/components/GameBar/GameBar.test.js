import React from 'react'
import {shallow, mount} from 'enzyme'
import GameBar from "./GameBar";
import GameBoardCell from "../GameBoard/GameBoardCell";

it('renders without crashing', () => {
  shallow(<GameBar />);
});

describe('<GameBar>', () => {
  let wrapper;
  const MINES = 10;
  const handleSupermanModeChange = jest.fn();

  beforeEach(() => {
    wrapper = mount(<GameBar mines={MINES} isSupermanMode={false} onSupermanModeChange={handleSupermanModeChange}/>)
  })

  it('should render correct mines number', () => {
    const minesItemText = wrapper.find('div').first().text();
    expect(minesItemText).toEqual(' : ' + MINES);
  });

  it('should toggle Superman mode on', () => {
    const supermanModeImageSelector = wrapper.find('div').at(2).childAt(0);
    supermanModeImageSelector.simulate('click');
    expect(handleSupermanModeChange).toBeCalledWith(true)
  });

})