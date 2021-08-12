import React from 'react';
import { Board } from './Board';

type History = {
    squares: string[]
}

type Props = {

}

type State = {
    histories: History[]
    xIsNext: boolean
    stepNumber: number
}

export class Game extends React.Component<Props, State> {
    constructor(props: Props){
        super(props);
        this.state = {
            histories: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true
        }
    }
    
    render() {
        const histories = this.state.histories.slice();
        const current = histories[this.state.stepNumber];

        const winner = this.calculateWinner(current.squares);
        
        const moves = histories.map((step, move) => {
            const desc = move ? 
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        })
        
        let status;
        if (winner){
            status = "Winner: " + winner;
        }else{
            status = "Next player: " + (this.state.xIsNext ? "×" : "〇");
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                    squares={current.squares}  
                    onClickEvent={(i: number)=> this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

    private handleClick(i: number): void{
        const histories = this.state.histories.slice(0, this.state.stepNumber + 1);
        const current = histories[histories.length - 1];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares) || squares[i]) { return; }

        squares[i] = this.state.xIsNext ? "×" : "〇";
        this.setState({
            histories: histories.concat([{
                squares: squares
            }]),
            stepNumber: histories.length,
            xIsNext: !this.state.xIsNext
        })
    }
    
    private calculateWinner(squares: string[]): string | null {
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

    private jumpTo(step: number): void{
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }
}
