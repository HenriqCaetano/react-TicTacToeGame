import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


function Square(props) {
      return (
        <button className="square" onClick = { props.onClick }>
          {props.value} 
        </button>
      );
  }
  
  class Board extends React.Component {

    renderSquare(i) {
      return (
      <Square 
        value = {this.props.squares[i]}
        onClick = { () => this.props.onClick(i)} 
      />);
    }
  
    render() {
  
      return (
        <div>
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
        </div>
      );
    }
  }
  
  class Game extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            history: [{squares: Array(9).fill(null)}],
            xIsNext: true,
            stepNumber: 0,
            squarePosition: Array(2),
            gameStarted: false,
        }
    }


    handleClick(i){

        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();


        if(calculateWinner(squares) || squares[i]) return;

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        const squarePosition = getSquarePosition(i);
        
        this.setState({
            history: history.concat([{ //using concat because it does not mutate the original array
                squares: squares,
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
            squarePosition: squarePosition,
        });

        if(!this.state.gameStarted) this.setState({
          gameStarted: true,
        })
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step%2) === 0,

        })
    }


    render() {

        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const position = this.state.squarePosition;


        const moves = history.map((step, move) => {
            const desc = move ? "Go to move #" + move : "Go to game start";

            return (
                <li key = { move }>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        })

        let status; 
        if(winner){
            status = 'Winner: ' + winner;
        }
        else{
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        let lastClicked;
        if(this.state.gameStarted){
          lastClicked = `last clicked square: ${position[0]},${position[1]}`
        }

      return (
        <div className="game">
          <div className="game-board">
            <Board
                squares = {current.squares}
                onClick = { (i) => this.handleClick(i)}
            />
          </div>
            <div className="game-info">
            <div>{ status }</div>   
            <ol>{ moves }</ol>
            <p>{lastClicked}</p>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  function getSquarePosition(index){
    if(index === 0) return [1,1]
    else if(index === 1) return [2,1]
    else if(index === 2) return [3,1]
    else if(index === 3) return [1,2]
    else if(index === 4) return [2,2]
    else if(index === 5) return [3,2]
    else if(index === 6) return [1,3]
    else if(index === 7) return [2,3]
    else if(index === 8) return [3,3]
  }
