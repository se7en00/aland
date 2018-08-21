import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import panelStyle from 'layout/main/Main.scss';
import { PANEL_TITLE, PATHNAME, getLinkByName, renderOptions } from 'constants';
import {reduxForm, Field, getFormValues, SubmissionError} from 'redux-form';
import { connect } from 'react-redux';
import { resetSpecificField } from 'utils';
import { Button, Select, message } from 'antd';
import Header from '../shared/panel/PanelHeader';
import { renderTextField, renderSelectField, renderQuill, UploadFilesField } from '../shared/form';
import AutoSelectSearch from '../shared/autoSearch/AutoSelectSearch';

const required = value => (value ? undefined : '不能为空！');
function mapStateToProps(state) {
    return {
        values: getFormValues('noticeCreate')(state),
        departments: state.notices?.departments,
        userGroups: state.news?.userGroups
    };
}

@connect(mapStateToProps)
@reduxForm({form: 'noticeCreate', enableReinitialize: true })
class NoticeCreate extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        actions: PropTypes.object,
        submitting: PropTypes.bool,
        fieldValues: PropTypes.object,
        departments: PropTypes.object,
        userGroups: PropTypes.object,
        dispatch: PropTypes.func
    };

    componentDidMount() {
        const { departments, userGroups, actions: { loadDepartments, loadUserGroups } } = this.props;

        if (!departments) {
            loadDepartments();
        }
        if (!userGroups) {
            loadUserGroups();
        }
    }

    generateData = (values) => {
        const { actions: { addNotice } } = this.props;
        const file = values.coverImgPath?.[0];
        try {
            if (file) {
                Object.assign(values, {coverImgPath: file?.response?.locations[0]});
            }
        } catch (error) {
            throw new SubmissionError({cover: '上传图片失败！'});
        }

        const data = Object.keys(values).reduce((prev, next) => {
            if (next === 'userGroupId' && values.receiverType === 'GROUP') {
                prev.receiverIds = [values[next]];
            } else if (next === 'persons' && values.receiverType === 'USER') {
                prev.receiverIds = values[next].map(item => item.key);
            } else {
                prev[next] = values[next];
            }
            return prev;
        }, {});
        addNotice(data).then(() => {
            message.success('保存成功！');
            this.back();
        }).catch(() => {message.success('保存失败！');});
    };

    back = () => {
        const { actions: { push }} = this.props;
        push(getLinkByName(PATHNAME.NOTES_MANAGEMENT));
    };

    renderDepartmentsOptions = () => {
        const { departments = [] } = this.props;
        return renderOptions('id', 'name')(departments);
    };

    renderUserGroupOptions = () => {
        const { userGroups = [] } = this.props;
        return renderOptions('id', 'name')(userGroups);
    }

    render() {
        const { submitting, handleSubmit, fieldValues = {}, dispatch } = this.props;
        const { receiverType } = fieldValues;
        const restUserGroup = () => resetSpecificField(dispatch, 'taskDetails', 'userGroupId', '');
        const resetPersonValue = () => resetSpecificField(dispatch, 'taskDetails', 'persons', '');
        return (
            <Fragment>
                <Header title={PANEL_TITLE.NOTES_ADD}/>
                <div className={panelStyle.panel__body}>
                    <form name="noticeCreate" onSubmit={handleSubmit(this.generateData)}>
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

                        {
                            receiverType === 'GROUP' &&
                            <Field
                                className="col-md-4 col-lg-3"
                                rowClassName="inputRow"
                                name="userGroupId"
                                showSearch={true}
                                labelInValue={true}
                                allowClear={true}
                                filterOption={this.filterDept}
                                resetSelectValue={restUserGroup}
                                component={renderSelectField}
                                placeholder="学员群组"
                                label="学员群组"
                                validate={required}
                            >
                                {this.renderUserGroupOptions()}
                            </Field>
                        }

                        {
                            receiverType === 'USER' &&
                            <AutoSelectSearch
                                api="/api/users"
                                query="name"
                                mode="multiple"
                                resetSelectValue={resetPersonValue}
                                labelClassName="col-md-2 col-lg-1"
                                className="col-md-4 col-lg-3"
                                rowClassName="inputRow"
                                name="persons"
                                placeholder="搜索人员(可添加多个)"
                                label="人员"
                                validate={required}
                                renderOptions={renderOptions('id', 'name')}
                            />
                        }

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
export default NoticeCreate;
