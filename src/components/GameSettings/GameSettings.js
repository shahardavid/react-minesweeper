import React, {Component} from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export const DEFAULT_WIDTH = 8;
export const DEFAULT_HEIGHT = 8;
export const DEFAULT_MINES = 16;
export const MAX_SIZE = 300;

const PERSIST_STORAGE_ID = 'GameSettings';

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  width: 100%;
  padding: 15px 0px;
  background-color: #eaeaea;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 
              0px 4px 5px 0px rgba(0, 0, 0, 0.14), 
              0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  margin-bottom: 10px;
`

const TextFieldContainer = styled.div`
  display: inline-block;
  width: 70px;
  margin-right: 20px;
`

class GameSettings extends Component {
  constructor(){
    super();

    this.state = {
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
      mines: DEFAULT_MINES,
    }

    this.persistState = this.persistState.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStartNewGame = this.handleStartNewGame.bind(this);
  }

  componentDidMount(){
    this.setState({
      ...JSON.parse(localStorage.getItem(PERSIST_STORAGE_ID))
    })

    window.addEventListener('beforeunload', this.persistState);
  }

  componentWillUnmount(){
    window.removeEventListener('beforeunload', this.persistState);
  }

  persistState(){
    localStorage.setItem(PERSIST_STORAGE_ID, JSON.stringify(this.state));
  }

  handleInputChange(event){
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleStartNewGame(){
    const {onStartNewGame} = this.props;
    let {width, height, mines} = this.state;

    width = parseInt(width);
    height = parseInt(height);
    mines = parseInt(mines);

    width = !Number.isInteger(width)? DEFAULT_WIDTH : (width > MAX_SIZE? MAX_SIZE : (width < 1? 1 : width));
    height = !Number.isInteger(height)? DEFAULT_HEIGHT : (height > MAX_SIZE? MAX_SIZE : (height < 1? 1 : height));

    const totalNumberOfCells = width * height;
    mines = !Number.isInteger(mines)? Math.ceil(totalNumberOfCells / 4) : (mines > totalNumberOfCells? totalNumberOfCells : (mines < 1? 1 : mines));

    this.setState({
      width,
      height,
      mines
    })

    onStartNewGame(width, height, mines);
  }

  render() {
    const {width, height, mines} = this.state;

    return (
      <Container>
        <TextFieldContainer>
          <TextField
            id='width'
            name='width'
            label='Width'
            value={width}
            onChange={this.handleInputChange}
            type='number'
          />
        </TextFieldContainer>
        <TextFieldContainer>
          <TextField
            id='height'
            name='height'
            label='Weight'
            value={height}
            onChange={this.handleInputChange}
            type='number'
          />
        </TextFieldContainer>
        <TextFieldContainer>
          <TextField
            id='mines'
            name='mines'
            label='Mines'
            value={mines}
            onChange={this.handleInputChange}
            type='number'
          />
        </TextFieldContainer>
        <Button variant='contained' color='primary' onClick={this.handleStartNewGame}>
          New Game
        </Button>
      </Container>
    );
  }
}

export default GameSettings;