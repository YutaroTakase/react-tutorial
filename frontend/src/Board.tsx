import React from 'react';
import { Square } from './square';

type Props = {
    squares: string[];
    onClickEvent: Function;
}

export class Board extends React.Component<Props> {    
    renderSquare(i: number) {
        return <Square 
        value={this.props.squares[i]} 
        onClickEvent={() => this.props.onClickEvent(i)}
        />;
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
