import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form } from 'redux-form';
import {studyContentsOptions} from 'constants';
import { Button, message } from 'antd';
import { renderSelectField, renderQuill, renderTextField, UploadFilesField } from '../../shared/form';
import validate from './studyContentsValidate';
import MaterialsForStudyContent from './MaterialsForStudyContent';
import PediaForStudyContent from './PediaForStudyContent';

@reduxForm({form: 'pointStudyContents', enableReinitialize: true, validate})
class StudyContents extends Component {
    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func),
        handleSubmit: PropTypes.func,
        // dispatch: PropTypes.func,
        showDialog: PropTypes.func,
        point: PropTypes.object,
        submitting: PropTypes.bool,
        invalid: PropTypes.bool
        // error: PropTypes.string,
    }

    onSelect = (value) => {
        const {actions: {switchStudyContentType}} = this.props;
        switchStudyContentType(value);
    }

    submit = (values) => {
        const {type} = values;
        const {point: {pointContent, selectedMaterial}, actions: {saveStudyContent}} = this.props;
        let studyUpdate = {type};
        const {courseId, pointId} = pointContent;
        switch (type) {
        case 'LINK':
            studyUpdate = Object.assign(studyUpdate, {link: values.url});
            break;
        case 'UPLOAD':
            studyUpdate = Object.assign(studyUpdate, {link: values.files.url});
            break;
        case 'PEDIA':
            studyUpdate = Object.assign(studyUpdate, {link: values.pedias.key, content: values.prediaContent});
            break;
        case 'MEDIA':
            studyUpdate = Object.assign(studyUpdate, {link: selectedMaterial.id});
            break;
        default:
            studyUpdate = Object.assign(studyUpdate, {content: values.content});
            break;
        }
        saveStudyContent(courseId, pointId, studyUpdate)
            .then(() => {message.success('保存成功！');})
            .catch(() => {message.error('保存失败！');});
    }

    render() {
        const {submitting, handleSubmit, invalid, point, showDialog, actions} = this.props;
        return (
            <div>
                <Form onSubmit={handleSubmit(this.submit)}>
                    <Field
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="type"
                        onSelect={this.onSelect}
                        component={renderSelectField}
                        label="模块"
                    >
                        {studyContentsOptions}
                    </Field>

                    {
                        point.type === 'ARTICLE' &&
                        <Field
                            className="col-md-10 offset-md-1"
                            rowClassName="inputRow inputRow__richText"
                            name="content"
                            component={renderQuill}
                        />
                    }

                    {
                        point.type === 'MEDIA' &&
                        <MaterialsForStudyContent
                            point={point}
                            actions={actions}
                            showDialog={showDialog}
                        />
                    }

                    {
                        point.type === 'PEDIA' &&
                        <PediaForStudyContent
                            point={point}
                            actions={actions}
                        />
                    }

                    {
                        point.type === 'LINK' &&
                        <Field
                            className="col-md-8 col-lg-6"
                            rowClassName="inputRow"
                            name="url"
                            component={renderTextField}
                            addonBefore="URL"
                            placeholder="链接"
                            label="链接"
                        />
                    }

                    <Field
                        className="col-md-8 col-lg-9"
                        rowClassName="inputRow"
                        style={{display: point.type === 'UPLOAD' ? 'flex' : 'none'}}
                        name="files"
                        onlyOneFile={true}
                        component={UploadFilesField}
                        uploadTitle="上传文件"
                        label="学习资料"
                    />


                    <div className="row inputRow">
                        <div className="col-md-10 offset-md-2 offset-lg-1">
                            <Button
                                htmlType="submit"
                                disabled={invalid || (!point?.selectedMaterial && point.type === 'MEDIA')}
                                loading={submitting}
                                type="primary"
                                className="editable-add-btn">
                                保存
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

export default StudyContents;
