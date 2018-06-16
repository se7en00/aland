import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AutoComplete, Icon, Input } from 'antd';
import remapReduxFormProps from '../RemapReduxFormProps';

@remapReduxFormProps
class AutoCompleteField extends Component {
    static propTypes = {
        input: PropTypes.object,
        placeholder: PropTypes.string,
        meta: PropTypes.object,
        onSelect: PropTypes.func,
        onSearch: PropTypes.func,
        dataSource: PropTypes.object,
        className: PropTypes.string
    }

    errorMsg = (errorMsg) => <span className="error">{errorMsg}</span>
    render() {
        const {
            input,
            placeholder,
            meta: { touched, error},
            className,
            onSelect,
            onSearch,
            dataSource
        } = this.props;
        return (
            <div className={className}>
                <AutoComplete
                    dataSource={dataSource}
                    onSelect={onSelect}
                    onSearch={onSearch}
                    placeholder={placeholder}
                >
                    <Input
                        {...input}
                        prefix={<Icon type="search"/>}/>
                </AutoComplete>
                {touched && error && this.errorMsg(error)}
            </div>
        );
    }
}

export default AutoCompleteField;
