import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';
import remapReduxFormProps from '../RemapReduxFormProps';

const RadioGroup = Radio.Group;

@remapReduxFormProps
class RadioGroupField extends Component {
    static propTypes = {
        input: PropTypes.object,
        className: PropTypes.string,
        defaultChecked: PropTypes.bool,
        checked: PropTypes.bool
    }

    handleChange = (e) => {
        const {input} = this.props;
        const isChecked = e.target.checked;
        input.onChange(isChecked);
    }

    render() {
        const {
            input,
            className,
            defaultChecked
        } = this.props;
        return (
            <div className={className}>
                <RadioGroup
                    {...input}
                    defaultChecked={defaultChecked}
                    onChange={this.handleChange}
                >
                    ss
                </RadioGroup>
            </div>
        );
    }
}

export default RadioGroupField;
