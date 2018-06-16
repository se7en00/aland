import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { debounce } from 'utils';
import { AutoComplete } from 'antd';
import uuid from 'uuid/v4';
import { renderAutoCompleteField } from '../form';


const Option = AutoComplete.Option;
class LecturerAutoSearch extends Component {
    static propTypes = {
        searchLecturers: PropTypes.func.isRejected,
        className: PropTypes.string,
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

    renderOption = (list) => list.map(lecturer =>
        (<Option key={uuid()} value={lecturer.id}>{lecturer.name}</Option>)
    )
    //search 讲师
    searchLecturerByName = (name) => {
        const {searchLecturers} = this.props;
        this.setState({ dataSource: [], fetching: true });
        if (name) {
            searchLecturers(name)
                .then(data => {
                    const {elements = []} = data?.value;
                    this.setState({dataSource: this.renderOption(elements), fetching: false});
                })
                .catch(error => console.log(error));
        }
    }

    render() {
        const {fetching, dataSource} = this.state;
        const {className, rowClassName} = this.props;
        return (
            <Field
                showSearch="true"
                className={className}
                rowClassName={rowClassName}
                name="lecturerName"
                fetching={fetching}
                dataSource={dataSource}
                onSearch={this.searchLecturerByName}
                component={renderAutoCompleteField}
                placeholder="讲师"
                label="讲师"
            />
        );
    }
}

export default LecturerAutoSearch;
