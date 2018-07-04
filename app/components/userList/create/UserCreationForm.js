import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { reduxForm, Form, Field } from 'redux-form';
import { renderTextField } from '../../shared/form';

const required = value => (value ? undefined : '不能为空！');

@reduxForm({form: 'onlineLessonsDetails'})
class UserCreationForm extends Component {
    render() {
        const { submitting, handleSubmit } = this.props;
        return (
            <Form name="form" onSubmit={handleSubmit}>
                <Field
                    className="col-md-8 col-lg-6"
                    rowClassName="inputRow"
                    name="name"
                    component={renderTextField}
                    type="text"
                    placeholder="课程名称"
                    label="课程名称"
                    validate={required}
                />

                <Field
                    className="col-md-8 col-lg-6"
                    rowClassName="inputRow"
                    name="name"
                    component={renderTextField}
                    type="text"
                    placeholder="课程名称2"
                    label="课程名称2"
                    validate={required}
                />


                <div className="row inputRow">
                    <div className="col-md-8 col-lg-6 offset-md-2 offset-lg-1 u-text-right">
                        <Button htmlType="submit" loading={submitting} type="primary" className="editable-add-btn">保存</Button>
                    </div>
                </div>
            </Form>
        );
    }
}

UserCreationForm.propTypes = {
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool
};

export default UserCreationForm;
