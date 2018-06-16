import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Axios, debounce } from 'utils';
import uuid from 'uuid/v4';
import { Select } from 'antd';
import { renderSelectField } from '../form';

const Option = Select.Option;

class LecturerAutoSelect extends Component {
    static propTypes = {
        resetSelectValue: PropTypes.func,
        className: PropTypes.string,
        name: PropTypes.string,
        rowClassName: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.searchLecturerByName = debounce(this.searchLecturerByName, 800);
    }

    state = {
        dataSource: [],
        fetching: false
    }

    renderLecturerOptions = (list) => list.map(lecturer =>
        (<Option key={uuid()} value={lecturer.id}>{lecturer.name}</Option>)
    )

    //search 讲师
    searchLecturerByName = (name) => {
        if (name) {
            this.setState({ dataSource: [], fetching: true });
            Axios.get('/api/lecturers', {params: {name}})
                .then(response => {
                    const {elements = []} = response?.data;
                    this.setState({dataSource: elements, fetching: false});
                })
                .catch(error => console.log(error));
        }
    }

    render() {
        const {fetching, dataSource} = this.state;
        const {className, rowClassName, name, resetSelectValue} = this.props;
        return (
            <Field
                showSearch={true}
                allowClear={true}
                className={className}
                rowClassName={rowClassName}
                name={name}
                labelInValue={true}
                fetching={fetching}
                onSearch={this.searchLecturerByName}
                resetSelectValue={resetSelectValue}
                component={renderSelectField}
                placeholder="讲师"
                label="讲师"
            >
                {this.renderLecturerOptions(dataSource)}
            </Field>
        );
    }
}

export default LecturerAutoSelect;
