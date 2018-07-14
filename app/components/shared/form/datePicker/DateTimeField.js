import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import remapReduxFormProps from '../RemapReduxFormProps';

@remapReduxFormProps
class DateTimeField extends PureComponent {
    static propTypes = {
        input: PropTypes.object,
        allowClear: PropTypes.bool,
        resetSelectValue: PropTypes.func,
        className: PropTypes.string
    }

    handleChange = (value) => {
        const {input, allowClear, resetSelectValue} = this.props;
        if ((!value || value.length === 0) && allowClear) {
            //清空
            resetSelectValue();
        } else {
            input.onChange(value);
        }
    }

    render() {
        const {allowClear, className, input} = this.props;
        return (
            <div className={className}>
                <DatePicker
                    {...input}
                    className="u-full-width"
                    onChange={this.handleChange}
                    allowClear={allowClear}
                    format={'YYYY-MM-DD'}
                />
            </div>
        );
    }
}

export default DateTimeField;
