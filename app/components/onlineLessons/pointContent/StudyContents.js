import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form } from 'redux-form';
import { Button, message} from 'antd';
import { renderQuill, renderTextField, UploadFilesField } from '../../shared/form';
import validate from './studyContentsValidate';


@reduxForm({form: 'pointStudyContents', enableReinitialize: true, validate})
class StudyContents extends Component {
    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func),
        handleSubmit: PropTypes.func,
        // dispatch: PropTypes.func,
        // showDialog: PropTypes.func,
        point: PropTypes.object,
        submitting: PropTypes.bool,
        invalid: PropTypes.bool,
        videoType: PropTypes.string
        // error: PropTypes.string,
    }

    submit = (values) => {
        const {content} = values;
        const {point: {pointContent}, videoType, actions: {saveStudyContent}} = this.props;
        let studyUpdate = {content};
        const {courseId, pointId} = pointContent;
        switch (videoType) {
        case '1':
            studyUpdate = Object.assign(studyUpdate, {link: values.url, videoFlg: '1'});
            break;
        case '2':
            studyUpdate = Object.assign(studyUpdate, {link: values.files.url, videoFlg: '1'});
            break;
        default:
            studyUpdate = Object.assign(studyUpdate, {content: values.content, videoFlg: '0'});
            break;
        }
        saveStudyContent(courseId, pointId, studyUpdate)
            .then(() => {message.success('保存成功！');})
            .catch(() => {message.error('保存失败！');});
    }

    changeVideoType = (key = '0') => {
        const {actions: {switchStudyContentType}} = this.props;
        switchStudyContentType(key);
    }

    render() {
        const {submitting, handleSubmit, invalid, videoType} = this.props;
        return (
            <div>
                <Form onSubmit={handleSubmit(this.submit)}>
                    <div className="row inputRow">
                        <div className="col-md-12 col-lg-12">
                            <Button htmlType="button" onClick={this.changeVideoType} name="sectionButton" type="primary" ghost>添加图文信息</Button>
                            <Button htmlType="button" onClick={() => this.changeVideoType('1')} name="sectionButton" type="primary" ghost>添加链接</Button>
                            <Button htmlType="button" onClick={() => this.changeVideoType('2')} name="sectionButton" type="primary" ghost>本地上传</Button>
                        </div>
                    </div>

                    {
                        videoType === '1' &&
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
                    {
                        videoType === '2' &&
                        <Field
                            className="col-md-8 col-lg-9"
                            rowClassName="inputRow"
                            style={{display: 'flex'}}
                            name="files"
                            onlyOneFile={true}
                            accept="video/*"
                            component={UploadFilesField}
                            uploadTitle="上传视频文件"
                            label="学习资料"
                        />
                    }

                    <Field
                        className="col-md-10"
                        rowClassName="inputRow inputRow__richText"
                        name="content"
                        component={renderQuill}
                    />


                    <div className="row inputRow">
                        <div className="col-md-10 offset-md-2 offset-lg-1">
                            <Button
                                htmlType="submit"
                                disabled={invalid}
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
