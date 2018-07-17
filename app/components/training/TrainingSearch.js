import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Button, Icon, Select } from 'antd';
import uuid from 'uuid/v4';
import { renderOptions, trainingStatusOptions } from 'constants';
import { resetSpecificField } from 'utils';
import { renderTextField, renderSelectField, renderDateRangeField} from '../shared/form';

const Option = Select.Option;

@reduxForm({form: 'trainingSearch'})
class TrainingSearch extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        dispatch: PropTypes.func,
        submitting: PropTypes.bool,
        departments: PropTypes.array,
        userLevels: PropTypes.array
    };

    renderDepartmentsOptions = () => {
        const {departments = []} = this.props;
        return renderOptions('name', 'name')(departments);
    }

    renderUserLevelsOptions = () => {
        const {userLevels = []} = this.props;
        return userLevels.map(item => (
            <Option key={uuid()} value={item}>{item}</Option>
        ));
    }

    render() {
        const { submitting, handleSubmit, dispatch } = this.props;
        const restRangeDateTime = () => resetSpecificField(dispatch, 'trainingSearch', 'dateTime', '');
        const restTrainingStatus = () => resetSpecificField(dispatch, 'trainingSearch', 'status', '');
        return (
            <div>
                <form name="form" onSubmit={handleSubmit}>
                    <div className="row">

                        <Field
                            layout="elementOnly"
                            name="title"
                            rowClassName="col-md-2"
                            component={renderTextField}
                            type="text"
                            prefix={<Icon type="search"/>}
                            placeholder="关键字"
                        />

                        <Field
                            layout="elementOnly"
                            name="manager"
                            rowClassName="col-md-2"
                            component={renderTextField}
                            type="text"
                            prefix={<Icon type="search"/>}
                            placeholder="负责人"
                        />

                        <Field
                            layout="elementOnly"
                            rowClassName="col-md-2"
                            name="status"
                            allowClear={true}
                            resetSelectValue={restTrainingStatus}
                            component={renderSelectField}
                            placeholder="状态"
                        >
                            {trainingStatusOptions}
                        </Field>

                        <Field
                            layout="elementOnly"
                            name="dateTime"
                            rowClassName="col-md-3"
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

export default TrainingSearch;
