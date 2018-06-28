import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form, SubmissionError } from 'redux-form';
import { Button, message } from 'antd';
import { resetSpecificField } from 'utils';
import { renderOptions } from 'constants';
import AutoSelectSearch from '../../shared/autoSearch/AutoSelectSearch';
import { renderSelectField, renderTextField, UploadImageField } from '../../shared/form';

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

        const params = Object.keys(values).reduce((map, k) => {
            if (k === 'lecturerId' || k === 'provideId') {
                map[k] = values[k].key;
            } else {
                map[k] = values[k];
            }
            return map;
        }, {});

        createDraftOnlineLesson(courseID, params)
            .then(() => {message.success(`保存课程${values.name}成功！`);})
            .catch(() => {message.success(`保存课程${values.name}失败！`);});
    }

    renderCategoryOptions = () => {
        const {draftOnlineLesson: {categoryList = [] }} = this.props;
        return renderOptions('code', 'name')(categoryList);
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
                        component={UploadImageField}
                        uploadTitle="上传图片"
                        label="课程封面"
                    />

                    <Field
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="categoryCode"
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
                        renderOptions={renderOptions('id', 'name')}
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
                        renderOptions={renderOptions('id', 'name')}
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
