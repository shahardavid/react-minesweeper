import React from 'react'
import {shallow, mount} from 'enzyme'
import GameSettings, {DEFAULT_HEIGHT, DEFAULT_MINES, DEFAULT_WIDTH, MAX_SIZE} from "./GameSettings";
import Button from '@material-ui/core/Button';

it('renders without crashing', () => {
  shallow(<GameSettings />);
});

describe('<GameSettings>', () => {
  let wrapper;
  const handleStartNewGame = jest.fn();

  beforeEach(() => {
    wrapper = mount(<GameSettings onStartNewGame={handleStartNewGame}/>)
  })

  it('should send default values on start new game click', () => {
    wrapper.find(Button).first().simulate('click');
    expect(handleStartNewGame).toBeCalledWith(DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_MINES);
  });

  it('should send input values on valid input values on start new game click', () => {
    wrapper.find('input[name="width"]').first().simulate('change', {target: {name: 'width', value: 6}});
    wrapper.find('input[name="height"]').first().simulate('change', {target: {name: 'height', value: 6}});
    wrapper.find('input[name="mines"]').first().simulate('change', {target: {name: 'mines', value: 6}});

    wrapper.find(Button).first().simulate('click');
    expect(handleStartNewGame).toBeCalledWith(6, 6, 6);
  });

  it('should send limited values on exceeded input values limit on start new game click', () => {
    const overLimitSize = MAX_SIZE + 1;

    wrapper.find('input[name="width"]').first().simulate('change', {target: {name: 'width', value: overLimitSize}});
    wrapper.find('input[name="height"]').first().simulate('change', {target: {name: 'height', value: overLimitSize}});
    wrapper.find('input[name="mines"]').first().simulate('change', {target: {name: 'mines', value: Math.pow(overLimitSize, 2) + 1}});

    wrapper.find(Button).first().simulate('click');
    expect(handleStartNewGame).toBeCalledWith(MAX_SIZE, MAX_SIZE, MAX_SIZE * MAX_SIZE);
  });

  it('should send minimum values on below minimum input values limit on start new game click', () => {
    wrapper.find('input[name="width"]').first().simulate('change', {target: {name: 'width', value: '0'}});
    wrapper.find('input[name="height"]').first().simulate('change', {target: {name: 'height', value: '0'}});
    wrapper.find('input[name="mines"]').first().simulate('change', {target: {name: 'mines', value: '0'}});

    wrapper.find(Button).first().simulate('click');
    expect(handleStartNewGame).toBeCalledWith(1, 1, 1);
  });

  it('should send default values on non integer input values on start new game click', () => {
    wrapper.find('input[name="width"]').first().simulate('change', {target: {name: 'width', value: 'test'}});
    wrapper.find('input[name="height"]').first().simulate('change', {target: {name: 'height', value: 'test'}});
    wrapper.find('input[name="mines"]').first().simulate('change', {target: {name: 'mines', value: 'test'}});

    wrapper.find(Button).first().simulate('click');
    expect(handleStartNewGame).toBeCalledWith(DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_MINES);
  });
})