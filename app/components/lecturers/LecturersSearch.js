import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { resetSpecificField } from 'utils';
import { renderDateRangeField} from '../shared/form';

@reduxForm({form: 'lecturersSearch'})
class LecturersSearch extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        dispatch: PropTypes.func,
        submitting: PropTypes.bool
    };

    render() {
        const { submitting, handleSubmit, dispatch } = this.props;
        const restRangeDateTime = () => resetSpecificField(dispatch, 'lecturersSearch', 'dateTime', '');
        return (
            <div>
                <form name="form" onSubmit={handleSubmit}>
                    <div className="row">
                        <Field
                            layout="elementOnly"
                            name="dateTime"
                            rowClassName="col-md-4"
                            allowClear={true}
                            resetSelectValue={restRangeDateTime}
                            component={renderDateRangeField}
                        />

                        <Button
                            htmlType="submit"
                            loading={submitting}
                            className="col-md-1"
                            type="primary">
                            搜索
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default LecturersSearch;
