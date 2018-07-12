import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'antd';
import remapReduxFormProps from '../RemapReduxFormProps';
import switchStyle from './SwitchField.scss';

@remapReduxFormProps
class SwitchField extends Component {
    static propTypes = {
        input: PropTypes.object,
        loading: PropTypes.bool,
        size: PropTypes.string,
        className: PropTypes.string,
        checkedChildren: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
        unCheckedChildren: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
        title: PropTypes.string
    }

    render() {
        const {
            input,
            size,
            loading,
            className,
            checkedChildren,
            unCheckedChildren,
            title
        } = this.props;
        let value = input.value;
        if (typeof value !== 'boolean') {
            value = !!+value;
        }
        return (
            <div className={className}>
                <Switch
                    {...input}
                    defaultChecked
                    checked={value}
                    size={size}
                    checkedChildren={checkedChildren}
                    unCheckedChildren={unCheckedChildren}
                    loading={loading}
                />
                <span className={switchStyle.switchTitle}>{title}</span>
            </div>
        );
    }
}

export default SwitchField;
