import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import panelStyle from 'layout/main/Main.scss';
import { PANEL_TITLE, PATHNAME, getLinkByName, renderOptions } from 'constants';
import {reduxForm, Field, getFormValues, SubmissionError} from 'redux-form';
import { connect } from 'react-redux';
import { Button, Select, message } from 'antd';
import Header from '../shared/panel/PanelHeader';
import { renderTextField, renderSelectField, renderQuill, UploadFilesField } from '../shared/form';

const required = value => (value ? undefined : '不能为空！');
function mapStateToProps(state) {
    return {
        values: getFormValues('newsCreate')(state),
        departments: state.news?.departments
    };
}

@connect(mapStateToProps)
@reduxForm({form: 'newsCreate', enableReinitialize: true })
class NewsCreate extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        actions: PropTypes.object,
        submitting: PropTypes.bool,
        values: PropTypes.object,
        departments: PropTypes.object
    };

    componentDidMount() {
        const { departments, actions: { loadDepartments } } = this.props;

        if (!departments) {
            loadDepartments();
        }
    }

    generateData = (values) => {
        const { actions: { addNews } } = this.props;
        const file = values.coverImgPath?.[0];
        try {
            if (file) {
                Object.assign(values, {coverImgPath: file?.response?.locations[0]});
            }
        } catch (error) {
            throw new SubmissionError({cover: '上传团片失败！'});
        }
        addNews(values).then(() => {
            message.success('保存成功！');
            this.back();
        }).catch(() => {message.success('保存失败！');});
    };

    back = () => {
        const { actions: { push }} = this.props;
        push(getLinkByName(PATHNAME.NEWS_MANAGEMENT));
    };

    renderDepartmentsOptions = () => {
        const { departments = [] } = this.props;
        return renderOptions('id', 'name')(departments);
    };

    render() {
        const { submitting, handleSubmit, values = {} } = this.props;
        const { receiverType } = values;
        return (
            <Fragment>
                <Header title={PANEL_TITLE.NEWS_ADD}/>
                <div className={panelStyle.panel__body}>
                    <form name="newsCreate" onSubmit={handleSubmit(this.generateData)}>
                        <Field
                            className="col-md-4 col-lg-3"
                            rowClassName="inputRow"
                            name="title"
                            component={renderTextField}
                            type="text"
                            placeholder="标题"
                            label="标题"
                            validate={required}
                        />
                        <Field
                            className="col-md-4 col-lg-3"
                            rowClassName="inputRow"
                            name="publishDeptId"
                            component={renderSelectField}
                            type="text"
                            label="发布部门"
                            placeholder="请选择部门"
                            validate={required}
                        >
                            {this.renderDepartmentsOptions()}
                        </Field>

                        <Field
                            className="col-md-4 col-lg-3"
                            rowClassName="inputRow"
                            name="receiverType"
                            component={renderSelectField}
                            type="text"
                            label="接收人"
                            placeholder="请选择接收人"
                            validate={required}
                        >
                            <Select.Option value="ALL">全员</Select.Option>
                            <Select.Option value="GROUP">学习群组</Select.Option>
                            <Select.Option value="USER">指定人员</Select.Option>
                        </Field>

                        {receiverType === 'GROUP' && <Fragment/>}

                        <Field
                            className="col-md-4 col-lg-3"
                            rowClassName="inputRow"
                            name="coverImgPath"
                            component={UploadFilesField}
                            type="text"
                            label="封面"
                            uploadTitle="本地上传"
                            uploadFileCount="1"
                            accept="image/*"
                        />

                        <Field
                            className="col-md-8 col-lg-6"
                            rowClassName="inputRow inputRow__richText"
                            name="content"
                            component={renderQuill}
                            type="text"
                            label="内容"
                        />

                        <div className="row inputRow">
                            <div className="col-md-8 col-lg-6 offset-md-2 offset-lg-1 u-text-right">
                                <Button key="back" onClick={this.back} loading={submitting} type="secondary" className="editable-add-btn">取消</Button>
                                <Button htmlType="submit" loading={submitting} type="primary" className="editable-add-btn">保存</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </Fragment>
        );
    }
}
export default NewsCreate;
