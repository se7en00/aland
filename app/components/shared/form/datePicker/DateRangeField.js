import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import remapReduxFormProps from '../RemapReduxFormProps';

@remapReduxFormProps
class DateRangeField extends PureComponent {
    static propTypes = {
        input: PropTypes.object,
        allowClear: PropTypes.bool,
        className: PropTypes.string,
        resetSelectValue: PropTypes.func
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
        const { RangePicker } = DatePicker;
        const {allowClear, className, input} = this.props;
        let value;
        if (!input.value || R.isEmpty(input.value)) {
            value = [];
        } else {
            value = input.value;
        }
        console.log(value)
        return (
            <RangePicker
                defaultValue={value}
                value={value}
                className={className}
                onChange={this.handleChange}
                allowClear={allowClear}
                format={'YYYY-MM-DD'}
            />
        );
    }
}

export default DateRangeField;
