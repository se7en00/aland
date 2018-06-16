import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form, SubmissionError } from 'redux-form';
import { Button, Select } from 'antd';
import { resetSpecificField } from 'utils';
import { renderOptions } from 'constants';
import uuid from 'uuid/v4';
import AutoSelectSearch from '../../shared/autoSearch/AutoSelectSearch';
import { renderSelectField, renderTextField, renderUploadField } from '../../shared/form';

const Option = Select.Option;
const required = value => (value ? undefined : '不能为空！');

@reduxForm({form: 'onlineLessonsDetails'})
class OnlineLessonDetails extends Component {
    //保存
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
        const { submitting, handleSubmit, dispatch } = this.props;
        const restVendorValue = () => resetSpecificField(dispatch, 'onlineLessonsDetails', 'provideId', '');
        const restLecturerValue = () => resetSpecificField(dispatch, 'onlineLessonsDetails', 'lecturerId', '');
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
                        validate={required}
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

                    <AutoSelectSearch
                        api="/api/lecturers"
                        query="name"
                        resetSelectValue={restLecturerValue}
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="lecturerId"
                        placeholder="讲师"
                        label="讲师"
                        renderOptions={renderOptions}
                    />

                    <AutoSelectSearch
                        api="/api/provides"
                        query="name"
                        resetSelectValue={restVendorValue}
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="provideId"
                        placeholder="供应商"
                        label="供应商"
                        renderOptions={renderOptions}
                    />

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
    dispatch: PropTypes.func,
    // showDialog: PropTypes.func,
    submitting: PropTypes.bool,
    draftOnlineLesson: PropTypes.object
    // error: PropTypes.string,
};
OnlineLessonDetails.defaultProps = {};

export default OnlineLessonDetails;
