import React from 'react'
import {shallow, mount} from 'enzyme'
import GameOver from "./GameOver";

it('renders without crashing', () => {
  shallow(<GameOver />);
});

it('should show empty char when no win or lose', () => {
  const wrapper = mount(<GameOver/>);
  expect(wrapper.find('div').first().text()).toEqual('\u00a0');
});

it('should show on win', () => {
  const wrapper = mount(<GameOver isWin={true}/>);
  expect(wrapper.find('div').first().text()).toEqual('WIN');
});

it('should show on win', () => {
  const wrapper = mount(<GameOver isLose={true}/>);
  expect(wrapper.find('div').first().text()).toEqual('LOSE');
});
