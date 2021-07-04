import "./styles.css";
import { Component } from 'react';

export class Button extends Component {
    render() {
        const { title, onClick, disabled } = this.props;

        return (
            <button disabled={ disabled } className="button" onClick={onClick}>
                { title }
            </button>
        )
    }
}