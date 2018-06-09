import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import remapReduxFormProps from '../RemapReduxFormProps';

@remapReduxFormProps
class DateRangeField extends PureComponent {
    static propTypes = {
        input: PropTypes.object
    }

    render() {
        const { RangePicker } = DatePicker;
        const {input: { onChange }} = this.props;
        return (
            <RangePicker
                onChange={onChange}
                format={'YYYY-MM-DD'}
            />
        );
    }
}

export default DateRangeField;
