import React, { Component } from 'react';
import { Input, Icon } from 'antd';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import style from './EditableCell.scss';

const cx = classNames.bind(style);

class EditableCell extends Component {
    static propTypes = {
        onChange: PropTypes.bool,
        value: PropTypes.string
    };

    state = {
        value: this.props.value,
        editable: false
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ value });
    }

    check = () => {
        this.setState({ editable: false });
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }

    edit = () => {
        this.setState({ editable: true });
    }

    render() {
        const { value, editable } = this.state;
        return (
            <div className={cx('editable-cell')}>
                {
                    editable ?
                        <div className={cx('editable-cell__inputWrapper')}>
                            <Input
                                value={value}
                                onChange={this.handleChange}
                                onPressEnter={this.check}
                            />
                            <Icon
                                type="check"
                                className={cx('editable-cell__icon', 'editable-cell__icon--check')}
                                onClick={this.check}
                            />
                        </div>
                        :
                        <div className={cx('editable-cell__textWrapper')}>
                            {value || ' '}
                            <Icon
                                type="edit"
                                className={cx('editable-cell__icon')}
                                onClick={this.edit}
                            />
                        </div>
                }
            </div>
        );
    }
}

export default EditableCell;
