import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag, Input, Icon } from 'antd';
import style from './TrainingCost.scss';

class TrainingCostGroup extends Component {
    static propTypes = {
        // showDialog: PropTypes.func
        actions: PropTypes.objectOf(PropTypes.func),
        type: PropTypes.string,
        list: PropTypes.array
    };

    state = {
        inputVisible: false,
        inputValue: ''
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }


    handleInputConfirm = () => {
        const state = this.state;
        const {actions, list, type} = this.props;
        const inputValue = state.inputValue;
        const tags = list.map(lecture => (lecture.name));
        const maxCode = list.reduce((pre, next) => (pre > next ? pre : next));
        if (inputValue && tags.indexOf(inputValue) === -1) {
            if (type === 'TRAINING_TYPE') {
                actions.saveTrainingType(inputValue, maxCode + 1).then(() => {
                    this.setState({
                        inputVisible: false,
                        inputValue: ''
                    });
                });
            } else {
                actions.saveCostTypes(inputValue, maxCode + 1).then(() => {
                    this.setState({
                        inputVisible: false,
                        inputValue: ''
                    });
                });
            }
        } else {
            this.setState({
                inputVisible: false,
                inputValue: ''
            });
        }
    }

    handleClose = (id) => {
        const {actions: {deleteTraining, deleteCost}, type} = this.props;
        if (type === 'TRAINING_TYPE') {
            deleteTraining(id);
        } else {
            deleteCost(id);
        }
    }

    saveInputRef = input => {this.input = input;}

    renderList = () => {
        const { list } = this.props;
        if (!list) return null;
        return list.map(item => (
            <Tag key={item.id} closable afterClose={() => this.handleClose(item.id)}>
                {item.name}
            </Tag>));
    }

    render() {
        const { inputVisible } = this.state;
        return (
            <div className={style.tagGroup}>
                {this.renderList()}
                {inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
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
                        <Icon type="plus"/> 添加
                    </Tag>
                )}
            </div>
        );
    }
}

export default TrainingCostGroup;
