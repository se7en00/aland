import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Button, Icon, Select } from 'antd';
import uuid from 'uuid/v4';
import { renderOptions } from 'constants';
import { resetSpecificField } from 'utils';
import { renderTextField, renderSelectField, renderDateRangeField} from '../shared/form';

const Option = Select.Option;

@reduxForm({form: 'userSearch'})
class UserSearch extends Component {
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
        const restRangeDateTime = () => resetSpecificField(dispatch, 'examsSearch', 'dateTime', '');
        const restDept = () => resetSpecificField(dispatch, 'userSearch', 'deptName', '');
        const restUserLevel = () => resetSpecificField(dispatch, 'userSearch', 'userLevel', '');
        return (
            <div>
                <form name="form" onSubmit={handleSubmit}>
                    <div className="row">

                        <Field
                            layout="elementOnly"
                            name="name"
                            rowClassName="col-md-2"
                            component={renderTextField}
                            type="text"
                            prefix={<Icon type="search"/>}
                            placeholder="姓名"
                        />

                        <Field
                            layout="elementOnly"
                            rowClassName="col-md-3"
                            name="deptName"
                            allowClear={true}
                            resetSelectValue={restDept}
                            component={renderSelectField}
                            placeholder="部门"
                        >
                            {this.renderDepartmentsOptions()}
                        </Field>

                        <Field
                            layout="elementOnly"
                            rowClassName="col-md-2"
                            name="userLevel"
                            allowClear={true}
                            resetSelectValue={restUserLevel}
                            component={renderSelectField}
                            placeholder="员工级别"
                        >
                            {this.renderUserLevelsOptions()}
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

export default UserSearch;
