import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import remapReduxFormProps from '../RemapReduxFormProps';

@remapReduxFormProps
class CheckboxField extends Component {
    static propTypes = {
        input: PropTypes.object,
        className: PropTypes.string,
        defaultChecked: PropTypes.bool,
        checked: PropTypes.bool,
        children: PropTypes.node
    }

    handleChange = (e) => {
        const {input} = this.props;
        const isChecked = e.target.checked;
        input.onChange(isChecked);
    }

    render() {
        const {
            input: {value},
            className,
            defaultChecked,
            checked,
            children
        } = this.props;
        return (
            <div className={className}>
                <Checkbox
                    checked={checked || value}
                    defaultChecked={defaultChecked}
                    onChange={this.handleChange}
                >
                    {children}
                </Checkbox>
            </div>
        );
    }
}

export default CheckboxField;
