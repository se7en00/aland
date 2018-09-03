import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { Button, Icon, Select } from 'antd';
import { resetSpecificField } from 'utils';
import { renderTextField, renderSelectField, renderDateRangeField } from '../shared/form';

const Option = Select.Option;
@reduxForm({form: 'taskSearch'})
class TaskSearch extends Component {
    static propTypes = {
        // actions: PropTypes.objectOf(PropTypes.func),
        handleSubmit: PropTypes.func,
        dispatch: PropTypes.func,
        // showDialog: PropTypes.func,
        submitting: PropTypes.bool,
        userManagers: PropTypes.array
        // error: PropTypes.string
    };

    submit = (values) => {
        console.log(values);
    }
    renderManagerOptions = () => {
        let {userManagers = []} = this.props;
         console.log(userManagers)
        // userLecturers=[{id:1,name:1},{id:2,name:2}]
        return userManagers.length>0 && userManagers.map(item => (
            <Option key={uuid()} value={item.managerId}>{item.managerName}</Option>
        ));
    }

    render() {
       
        const { submitting, handleSubmit, dispatch} = this.props;
        const restRangeDateTime = () => resetSpecificField(dispatch, 'taskSearch', 'dateTime', '');
       
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
                            placeholder="关键词"
                        />

                        <Field
                            layout="elementOnly"
                            name="status"
                            rowClassName="col-md-2"
                            component={renderSelectField}
                            placeholder="状态">
                            <Option value="UNHANDLE">未处理</Option>
                            <Option value="CHECKING">审核中</Option>
                            <Option value="STUDYING">学习中</Option>
                            <Option value="FINISHED">已完成</Option>
                        </Field>

                        <Field
                            layout="elementOnly"
                            name="managerId"
                            rowClassName="col-md-2"
                            component={renderSelectField}
                            placeholder="负责人">
                           {this.renderManagerOptions()}
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

export default TaskSearch;
