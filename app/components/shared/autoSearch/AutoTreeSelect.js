import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Axios, debounce } from 'utils';
import { renderTreeSelectField } from '../form';
import EventEmitter from 'events';
let emitter = new EventEmitter;

class AutoTreeSelect extends Component {
    static propTypes = {
        resetSelectValue: PropTypes.func,
        style: PropTypes.object,
        className: PropTypes.string,
        name: PropTypes.string,
        rowClassName: PropTypes.string,
        labelClassName: PropTypes.string,
        api: PropTypes.string.isRequired,
        query: PropTypes.string,
        renderOptions: PropTypes.func.isRequired,
        label: PropTypes.string,
        layout: PropTypes.string,
        placeholder: PropTypes.string,
        mode: PropTypes.string,
        validate: PropTypes.func,
        popUserIds:PropTypes.func,
        onRef:PropTypes.func
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
    resetaction(data){
      
        emitter.emit('resetaction',data);
    }
    autoSearch = (name) => {
        const {api, query} = this.props;
        if (name || name === '') {
            const params = {
                [query]: name
            };
            if (api === '/api/users') {
                params.isAdmin = 0;
                params.status = 'ACTIVE';
                params.size = 2000;
            }
            this.setState({ dataSource: [], fetching: true });
            Axios.get(api, {params})
                .then(response => {
                    const {elements = []} = response?.data;
                    this.setState({dataSource: elements, fetching: false});
                })
                .catch(error => console.log(error));
        }
    }

    render() {
        const {fetching, dataSource} = this.state;
        const {
            labelClassName,
            className,
            rowClassName,
            style,
            name,
            resetSelectValue,
            renderOptions,
            placeholder,
            label,
            mode,
            layout,
            validate,
            popUserIds,
            api,
            values
        } = this.props;

        return (
            <Field
               values={values}
               api={api}
                showSearch={true}
                allowClear={true}
                mode={mode}
                style={style}
                className={className}
                labelClassName={labelClassName}
                rowClassName={rowClassName}
                name={name}
                layout={layout}
                labelInValue={true}
                fetching={fetching}
                onSearch={this.autoSearch}
                resetSelectValue={resetSelectValue}
                component={renderTreeSelectField}
                placeholder={placeholder}
                label={label}
                popUserIds={popUserIds}
                validate={validate}
                emitter={emitter}
            >
            </Field>
        );
    }
}

export default AutoTreeSelect;
