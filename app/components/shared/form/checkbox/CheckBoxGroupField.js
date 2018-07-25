import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import remapReduxFormProps from '../RemapReduxFormProps';

const CheckboxGroup = Checkbox.Group;

@remapReduxFormProps
class CheckBoxGroupField extends Component {
    static propTypes = {
        input: PropTypes.object,
        className: PropTypes.string,
        options: PropTypes.array
    }


    handleChange = (checkedValues) => {
        this.props.input.onChange(checkedValues);
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
            options = []
        } = this.props;
        let defaultValue;
        if (!value || R.isEmpty(value)) {
            defaultValue = [];
        } else {
            defaultValue = value;
        }
        return (
            <div className={className}>
                <CheckboxGroup
                    defaultValue={defaultValue}
                    value={defaultValue}
                    options={options}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

export default CheckBoxGroupField;
