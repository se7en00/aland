import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form, SubmissionError } from 'redux-form';
import { Button, Select } from 'antd';
import uuid from 'uuid/v4';
import { renderSelectField, renderTextField, renderUploadField } from '../../shared/form';

const Option = Select.Option;
const required = value => (value ? undefined : '不能为空！');

@reduxForm({form: 'onlineLessonsDetails'})
class OnlineLessonDetails extends Component {
    createDraftCourse = (values) => {
        const {actions: {createDraftOnlineLesson}, draftOnlineLesson} = this.props;
        const courseID = draftOnlineLesson?.draftLesson?.id;
        try {
            if (values.cover && values.cover[0]) {
                Object.assign(values, {cover: values.cover[0]?.response?.locations[0]});
            }
        } catch (error) {
            throw new SubmissionError({cover: '上传图片失败！'});
        }

        createDraftOnlineLesson(courseID, values)
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    renderCategoryOptions = () => {
        const {draftOnlineLesson: {categoryList = [] }} = this.props;
        return categoryList.map(category =>
            (<Option key={uuid()} value={category.code}>{category.name}</Option>)
        );
    }

    render() {
        const { submitting, handleSubmit } = this.props;
        return (
            <div>
                <Form name="form" onSubmit={handleSubmit(this.createDraftCourse)}>
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
                        className="col-md-4 col-lg-3"
                        rowClassName="inputRow"
                        accept="image/*"
                        style={{alignItems: 'flex-start'}}
                        name="cover"
                        uploadFileCount="1"
                        component={renderUploadField}
                        label="课程封面"
                    />

                    <Field
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="category"
                        component={renderSelectField}
                        placeholder="种类"
                        label="种类"
                    >
                        {this.renderCategoryOptions()}
                    </Field>

                    <Field
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="introduce"
                        style={{alignItems: 'flex-start'}}
                        component={renderTextField}
                        rows={4}
                        type="textarea"
                        placeholder="简介"
                        label="简介"
                    />

                    <Field
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="benefit"
                        style={{alignItems: 'flex-start'}}
                        component={renderTextField}
                        rows={4}
                        type="textarea"
                        placeholder="学习收益"
                        label="学习收益"
                    />

                    <Field
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="lecturerName"
                        component={renderSelectField}
                        placeholder="讲师"
                        label="讲师"
                    >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                    </Field>

                    <Field
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="vendor"
                        component={renderSelectField}
                        placeholder="供应商"
                        label="供应商"
                    >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                    </Field>

                    <div className="row inputRow">
                        <div className="col-md-8 col-lg-6 offset-md-2 offset-lg-1 u-text-right">
                            <Button htmlType="submit" loading={submitting} type="primary" className="editable-add-btn">保存</Button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

OnlineLessonDetails.propTypes = {
    actions: PropTypes.objectOf(PropTypes.func),
    handleSubmit: PropTypes.func,
    // showDialog: PropTypes.func,
    submitting: PropTypes.bool,
    draftOnlineLesson: PropTypes.object
    // error: PropTypes.string,
};
OnlineLessonDetails.defaultProps = {};

export default OnlineLessonDetails;
