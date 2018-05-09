import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Panel extends Component {
    static propTypes = {
        id: PropTypes.number,
        username: PropTypes.string,
        age: PropTypes.number

    };
    render() {
        return (
            <article>
                <span>{this.props.id}</span>
                <span>{this.props.username}</span>
                <span>{this.props.age}</span>
            </article>
        );
    }
}

export default Panel;
