import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { Select, Spin } from 'antd';
import classNames from 'classnames/bind';
import remapReduxFormProps from '../RemapReduxFormProps';
import style from './SelectField.scss';

@remapReduxFormProps
class SelectField extends PureComponent {
    static propTypes = {
        input: PropTypes.object,
        children: PropTypes.node,
        placeholder: PropTypes.string,
        meta: PropTypes.object,
        className: PropTypes.string,
        defaultValue: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.arrayOf(PropTypes.string, PropTypes.number)
        ]),
        resetSelectValue: PropTypes.func,
        onSelect: PropTypes.func,
        onDeselect: PropTypes.func,
        onSearch: PropTypes.func,
        onBlur: PropTypes.func,
        fetching: PropTypes.bool,
        allowClear: PropTypes.bool,
        labelInValue: PropTypes.bool,
        showSearch: PropTypes.bool,
        filterOption: PropTypes.func,
        mode: PropTypes.string
    }

    //渲染error msg
    errorMsg = (errorMsg) => <span className="error">{errorMsg}</span>

    handleChange = (value) => {
        const {input, allowClear, resetSelectValue} = this.props;
        if (!value && allowClear) {
            //清空
            resetSelectValue();
        } else {
            input.onChange(value);
        }
    }

    render() {
        const {
            input,
            children,
            placeholder,
            defaultValue,
            meta: { touched, error, warning},
            className,
            filterOption,
            onSelect,
            onDeselect,
            showSearch,
            allowClear,
            onSearch,
            onBlur,
            fetching,
            labelInValue,
            mode
        } = this.props;

        const {value = defaultValue} = input;
        const cx = classNames.bind(style);
        const selectErrorClassName = cx({'select-error': touched && (error || warning)});

        return (
            <div className={className}>
                <Select
                    mode={mode}
                    allowClear={allowClear}
                    labelInValue={labelInValue}
                    showSearch={showSearch}
                    className={selectErrorClassName}
                    notFoundContent={fetching ? <Spin size="small"/> : '没有匹配内容！'}
                    value={value || undefined} //加个undefined是用来修复value是空字符串时，placeholder不显示的问题 https://github.com/ant-design/ant-design/issues/2367
                    onChange={this.handleChange}
                    onSelect={onSelect}
                    onDeselect={onDeselect}
                    onSearch={onSearch}
                    onBlur={onBlur}
                    filterOption={filterOption}
                    placeholder={placeholder}
                >
                    {children}
                </Select>
                {touched && error && this.errorMsg(error)}
            </div>
        );
    }
}

export default SelectField;
