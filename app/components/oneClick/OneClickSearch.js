import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { Button, Icon, Select } from 'antd';
import { resetSpecificField } from 'utils';
import { renderTextField, renderSelectField, renderDateRangeField } from '../shared/form';

const Option = Select.Option;
@reduxForm({form: 'pediasSearch'})
class OneClickSearch extends Component {
    static propTypes = {
        // actions: PropTypes.objectOf(PropTypes.func),
        handleSubmit: PropTypes.func,
        dispatch: PropTypes.func,
        // showDialog: PropTypes.func,
        submitting: PropTypes.bool,
        userLecturers: PropTypes.array
        // error: PropTypes.string
    };

    submit = (values) => {
        console.log(values);
    }
    renderLecturersOptions = () => {
        let {userLecturers = []} = this.props;
         console.log(userLecturers)
        // userLecturers=[{id:1,name:1},{id:2,name:2}]
        return userLecturers.length>0 && userLecturers.map(item => (
            <Option key={uuid()} value={item.id}>{item.name}</Option>
        ));
    }

    render() {
       
        const { submitting, handleSubmit, dispatch ,userLecturers} = this.props;
        const restRangeDateTime = () => resetSpecificField(dispatch, 'pediasSearch', 'dateTime', '');
        console.log(userLecturers)
        return (
            <div>
                <form name="form" onSubmit={handleSubmit}>
                    <div className="row">

                        <Field
                            layout="elementOnly"
                            name="createUser"
                            rowClassName="col-md-2"
                            component={renderTextField}
                            type="text"
                            prefix={<Icon type="search"/>}
                            placeholder="创建人"
                        />

                        <Field
                            layout="elementOnly"
                            name="status"
                            rowClassName="col-md-2"
                            component={renderSelectField}
                            placeholder="状态">
                            <Option value="">全部</Option>
                            <Option value="CREATED">创建</Option>
                            <Option value="CHECKING">审核中</Option>
                            <Option value="PASSED">通过</Option>
                        </Field>

                        <Field
                            layout="elementOnly"
                            name="createUser"
                            rowClassName="col-md-2"
                            component={renderSelectField}
                            placeholder="课程讲师">
                           {this.renderLecturersOptions()}
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

export default OneClickSearch;
