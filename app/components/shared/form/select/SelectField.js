import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import remapReduxFormProps from '../RemapReduxFormProps';

@remapReduxFormProps
class SelectField extends PureComponent {
    static propTypes = {
        input: PropTypes.object,
        children: PropTypes.node,
        placeholder: PropTypes.string,
        // meta: PropTypes.object,
        className: PropTypes.string,
        defaultValue: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.arrayOf(PropTypes.string, PropTypes.number)
        ])
    }

    //渲染error msg
    errorMsg = (errorMsg) => <span className="error">{errorMsg}</span>

    render() {
        const {input, children, placeholder, defaultValue, className } = this.props;
        const {value = defaultValue, onChange} = input;
        return (
            <Select
                className={className}
                value={value || undefined} //加个undefined是用来修复value是空字符串时，placeholder不显示的问题 https://github.com/ant-design/ant-design/issues/2367
                onChange={onChange}
                placeholder={placeholder}
            >
                {children}
            </Select>
        );
    }
}

export default SelectField;
