import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Tag, Input, Icon } from 'antd';

class TagGroup extends Component {
    state = {inputVisible: false};

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    }

    saveInputRef = input => {this.input = input;}

    render() {
        const { inputVisible } = this.state;
        return (
            <div>
                {inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                    <Tag
                        onClick={this.showInput}
                        style={{ background: '#fff', borderStyle: 'dashed' }}
                    >
                        <Icon type="plus"/> New Tag
                    </Tag>
                )}
            </div>
        );
    }
}

export default TagGroup;
