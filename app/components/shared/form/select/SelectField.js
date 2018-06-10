import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
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
        onSelect: PropTypes.func
    }

    // filterOption = (inputValue, option) => option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;

    //渲染error msg
    errorMsg = (errorMsg) => <span className="error">{errorMsg}</span>

    render() {
        const {
            input,
            children,
            placeholder,
            defaultValue,
            meta: { touched, error, warning},
            className,
            onSelect
        } = this.props;

        const {value = defaultValue, onChange} = input;
        const cx = classNames.bind(style);
        const selectErrorClassName = cx({'select-error': touched && (error || warning)});

        return (
            <div className={className}>
                <Select
                    className={selectErrorClassName}
                    value={value || undefined} //加个undefined是用来修复value是空字符串时，placeholder不显示的问题 https://github.com/ant-design/ant-design/issues/2367
                    onChange={onChange}
                    onSelect={onSelect}
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
