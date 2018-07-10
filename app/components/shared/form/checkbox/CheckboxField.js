import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import remapReduxFormProps from '../RemapReduxFormProps';

@remapReduxFormProps
class CheckboxField extends Component {
    static propTypes = {
        input: PropTypes.object,
        className: PropTypes.string,
        defaultChecked: PropTypes.bool
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
        console.log(input);
        return (
            <div className={className}>
                <Checkbox
                    defaultChecked={defaultChecked}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

export default CheckboxField;
