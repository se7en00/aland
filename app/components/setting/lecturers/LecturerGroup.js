import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag, Input, Icon } from 'antd';
import style from './LecturerSetting.scss';

class LecturerSetting extends Component {
    static propTypes = {
        // showDialog: PropTypes.func
        actions: PropTypes.objectOf(PropTypes.func),
        lecturesLevels: PropTypes.array
    };

    state = {
        inputVisible: false,
        inputValue: ''
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    }

    saveInputRef = input => {this.input = input;}

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    }


    handleInputConfirm = () => {
        const state = this.state;
        const {actions, lecturesLevels} = this.props;
        const inputValue = state.inputValue;
        const tags = lecturesLevels.map(lecture => (lecture.name));
        const maxCode = lecturesLevels.reduce((pre, next) => (pre > next ? pre : next));
        if (inputValue && tags.indexOf(inputValue) === -1) {
            actions.saveLecturesLevels(inputValue, maxCode + 1).then(() => {
                this.setState({
                    inputVisible: false,
                    inputValue: ''
                });
            });
        } else {
            this.setState({
                inputVisible: false,
                inputValue: ''
            });
        }
    }

    handleClose = (lectureId) => {
        const {actions} = this.props;
        actions.deleteLctureLevels(lectureId);
    }

    renderLectures = () => {
        const { lecturesLevels } = this.props;
        if (!lecturesLevels) return null;
        return lecturesLevels.map(lectureLevel => (
            <Tag key={lectureLevel.id} closable afterClose={() => this.handleClose(lectureLevel.id)}>
                {lectureLevel.name}
            </Tag>));
    }

    render() {
        const { inputVisible } = this.state;

        return (
            <div className={style.tagGroup}>
                {this.renderLectures()}
                {inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        style={{ width: 120 }}
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


export default LecturerSetting;
