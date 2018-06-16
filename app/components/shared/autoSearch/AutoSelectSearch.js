import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Axios, debounce } from 'utils';
import { renderSelectField } from '../form';

class AutoSelectSearch extends Component {
    static propTypes = {
        resetSelectValue: PropTypes.func,
        className: PropTypes.string,
        name: PropTypes.string,
        rowClassName: PropTypes.string,
        api: PropTypes.string.isRequired,
        query: PropTypes.string,
        renderOptions: PropTypes.func.isRequired,
        label: PropTypes.string,
        layout: PropTypes.string,
        placeholder: PropTypes.string
    }

    static defaultProps = {
        api: '',
        renderOptions: () => {}
    }

    constructor(props) {
        super(props);
        this.autoSearch = debounce(this.autoSearch, 800);
    }

    state = {
        dataSource: [],
        fetching: false
    }

    autoSearch = (name) => {
        const {api, query} = this.props;
        if (name) {
            this.setState({ dataSource: [], fetching: true });
            Axios.get(api, {params: {[query]: name}})
                .then(response => {
                    const {elements = []} = response?.data;
                    this.setState({dataSource: elements, fetching: false});
                })
                .catch(error => console.log(error));
        }
    }

    render() {
        const {fetching, dataSource} = this.state;
        const {className, rowClassName, name, resetSelectValue, renderOptions, placeholder, label, layout} = this.props;
        return (
            <Field
                showSearch={true}
                allowClear={true}
                className={className}
                rowClassName={rowClassName}
                name={name}
                layout={layout}
                labelInValue={true}
                fetching={fetching}
                onSearch={this.autoSearch}
                resetSelectValue={resetSelectValue}
                component={renderSelectField}
                placeholder={placeholder}
                label={label}
            >
                {renderOptions(dataSource)}
            </Field>
        );
    }
}

export default AutoSelectSearch;
