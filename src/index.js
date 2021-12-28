import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function Square(props) {
  if (props.value === undefined){
    return (
        <button className="square" onClick={props.onClick}>
        </button>
      );
  }
  else if (props.winner){
    return (
      <button className="square-winner" onClick={props.onClick}>
        <div className="square-letter">{props.value}</div>
      </button>
    );
  }
  else{
    return (
      <button className="square" onClick={props.onClick}>
        <div className="square-letter">{props.value}</div>
      </button>
    );
  }
  }

class Board extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(undefined),
            xNow: true,
        }
        this.winners = [];
        this.restartGame = this.restartGame.bind(this);
    }

    handleClick(i){
        const squares = [...this.state.squares];
        if(!this.gameWon() && squares[i] === undefined) {
            squares[i] = this.state.xNow ? 'X' : 'O';
            this.setState({squares: squares, xNow: !this.state.xNow});
        }
    }

    renderSquare(i) {
      if(this.winners.includes(i)){
        return (
          <Square 
              value={this.state.squares[i]}
              onClick={() => true}
              winner={true}
          />
        );
      }
      else{
        return (
          <Square 
              value={this.state.squares[i]}
              onClick={() => this.handleClick(i)}
              winner={false}
          />
        );
      }
    }

    restartGame(){
      this.setState({
        squares: Array(9).fill(undefined),
        xNow: true,
    })
    }

    renderRestart(){
      if(this.winners.length === 3){
        console.log(this.winners);
        return (
          <button className="restart-button" onClick={this.restartGame}><h3>RESTART</h3></button>
        )
      }
    }

    gameWon(){
        // Check rows
        const goodSol = (str) => str === 'XXX' || str === 'OOO';
        for(let i = 0; i< this.state.squares.length; i+=3){
            if(goodSol(this.state.squares.slice(i, i+3).join(''))){
              this.winners = [i, i+1, i+2];
              return `Winner is ${this.state.squares[i]}`;
            }
        }
        // Check cols
        for(let i = 0; i< this.state.squares.length/3; i+=1){
            if(goodSol([this.state.squares[i], this.state.squares[i+3], this.state.squares[i+6]].join(''))){
              this.winners = [i, i+3, i+6];
              return `Winner is ${this.state.squares[i]}`;
            }
        }
        // Check diags
        if(goodSol([this.state.squares[0], this.state.squares[4], this.state.squares[8]].join(''))){
          this.winners = [0, 4, 8];
          return `Winner is ${this.state.squares[0]}`;
        }
        if(goodSol([this.state.squares[2], this.state.squares[4], this.state.squares[6]].join(''))){
          this.winners = [2, 4, 6];
          return `Winner is ${this.state.squares[2]}`;
        }
        if (!this.state.squares.includes(undefined)){
          this.winners = [true, true, true];
          return 'DRAW';
        }
        this.winners = [];
        return '';
    }
  
    render() {
      const status = `Next player: ${this.state.xNow ? 'X' : 'O'}`;
      const winner = `${this.gameWon() ? `${this.gameWon()}` : ''}`
      return (
        <div>
          <div className="status"><h3>{winner ? winner : status}</h3></div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
          {this.renderRestart()}
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  