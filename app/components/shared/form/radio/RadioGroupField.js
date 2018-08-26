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
        children: PropTypes.node,
        defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }

    state = {
        value: null
    }


    handleChange = (e) => {
        const isSelected = e.target.value;
       
        this.props.input.onChange(isSelected);
    }
  
    // componentWillUpdate(nextProps) {
    //     if (nextProps.value) {
    //         this.props.input.onChange(nextProps.value);
    //     }
    // }

    render() {
        const {
            input: {value},
            className,
            children,
            defaultValue
        } = this.props;
        
        const radioValue = R.isEmpty(value) ? defaultValue : value;
        return (
            <div className={className}>
                <RadioGroup
                    value={radioValue}
                    onChange={this.handleChange}
                >
                    {children}
                </RadioGroup>
            </div>
        );
    }
}

export default RadioGroupField;
