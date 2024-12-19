import React from 'react';

export default class PhonebookItem extends React.Component {
    render() {
        return (
            <li>
                <span>{this.props.name}</span>: <span>{this.props.number}</span>
                <button onClick={this.props.onDelete}>Delete</button>
            </li>
        );
    }
}