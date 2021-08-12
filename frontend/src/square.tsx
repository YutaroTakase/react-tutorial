import React from 'react';

type Props = {
    value: string;
    onClickEvent: Function;
}

export class Square extends React.Component<Props> {
    render() {
        return (
            <button
                className="square"
                onClick={() => this.props.onClickEvent()}
            >
                {this.props.value}
            </button>
        );
    }
}