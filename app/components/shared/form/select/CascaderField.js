import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { Cascader } from 'antd';
import classNames from 'classnames/bind';
import remapReduxFormProps from '../RemapReduxFormProps';
import style from './SelectField.scss';

@remapReduxFormProps
class CascaderField extends PureComponent {
    static propTypes = {
        input: PropTypes.object,
        placeholder: PropTypes.string,
        meta: PropTypes.object,
        className: PropTypes.string,
        defaultValue: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.arrayOf(PropTypes.string, PropTypes.number)
        ]),
        resetSelectValue: PropTypes.func,
        allowClear: PropTypes.bool,
        onSelect: PropTypes.func,
        options: PropTypes.object
    }

    static defaultProps = {
        allowClear: true
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
            placeholder,
            defaultValue,
            meta: { touched, error, warning},
            className,
            onSelect,
            allowClear,
            options
        } = this.props;

        const {value = defaultValue} = input;
        const cx = classNames.bind(style);
        const selectErrorClassName = cx({'select-error': touched && (error || warning)});

        return (
            <div className={className}>
                <Cascader
                    allowClear={allowClear}
                    className={selectErrorClassName}
                    value={value || undefined} //加个undefined是用来修复value是空字符串时，placeholder不显示的问题 https://github.com/ant-design/ant-design/issues/2367
                    onChange={this.handleChange}
                    onSelect={onSelect}
                    options={options}
                    placeholder={placeholder}
                />
                {touched && error && this.errorMsg(error)}
            </div>
        );
    }
}

export default CascaderField;
