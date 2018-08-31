import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import panelStyle from 'layout/main/Main.scss';
import { PANEL_TITLE, PATHNAME, getLinkByName, renderOptions } from 'constants';
import {reduxForm, Field, getFormValues, SubmissionError} from 'redux-form';
import { connect } from 'react-redux';
import { resetSpecificField } from 'utils';
import { Button, Select, message ,Radio} from 'antd';
import Header from '../shared/panel/PanelHeader';
import { renderTextField, renderSelectField, renderQuill, UploadFilesField,renderRadioGroupField } from '../shared/form';
import AutoSelectSearch from '../shared/autoSearch/AutoSelectSearch';
import AutoTreeSelect from '../shared/autoSearch/AutoTreeSelect';
const required = value => (value ? undefined : '不能为空！');
function mapStateToProps(state) {
    return {
        values: getFormValues('noticeCreate')(state),
        fieldValues: getFormValues('noticeCreate')(state),
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
    popUserIds(obj){
        this.extendObj = obj;
    }
    generateData = (values) => {
        let _tmp=[];
        if(this.extendObj){
            this.extendObj.value.forEach(item=>{
                _tmp.push(
                    item.value
                   
                )
            })
            values.receiverIds = _tmp;
        }
        if(values.inquiryId){
            values.inquiryId = values.inquiryId.key;
        }
       
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
                prev.receiverIds =[values[next].key];
            } else if (next === 'userIds' && values.receiverType === 'USER') {
                prev.receiverIds = values[next].map(item => item.key);
            } else {
                prev[next] = values[next];
            }
            return prev;
        }, {});
        console.log(data);
      
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
        let value =[]
        
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

                         <AutoSelectSearch
                        api="/api/inquirys"
                        query=""
                      //  resetSelectValue={restManagerValue}
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="inquiryId"
                        placeholder="选择问卷"
                        label="通知问卷"
                        validate={required}
                        renderOptions={renderOptions('id', 'name')}
                    />
                    
                        <Field
                            className="col-md-8 col-lg-6"
                            rowClassName="inputRow"
                            name="receiverType"
                            component={renderRadioGroupField}
                           
                            label="接收人"
                            defaultValue="ALL"
                           
                            validate={required}
                        >
                            <Radio key={uuid()} value="ALL">全员</Radio>
                        <Radio key={uuid()} value="GROUP">学习群组</Radio>
                        <Radio key={uuid()} value="USER">指定人员</Radio>
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
                            // <AutoSelectSearch
                            //     api="/api/users"
                            //     query="name"
                            //     mode="multiple"
                            //     resetSelectValue={resetPersonValue}
                            //     labelClassName="col-md-2 col-lg-1"
                            //     className="col-md-4 col-lg-3"
                            //     rowClassName="inputRow"
                            //     name="persons"
                            //     placeholder="搜索人员(可添加多个)"
                            //     label="人员"
                            //     validate={required}
                            //     renderOptions={renderOptions('id', 'name')}
                            // />
                            <AutoTreeSelect
                        
                        api="/api/departments/users"
                        label="人员"
                        mode="multiple"
                        popUserIds={this.popUserIds.bind(this)}
                        labelClassName="col-md-2 col-lg-1"
                        className="col-md-8"
                        rowClassName="inputRow"
                        labelInValue={true}
                        name="userIds"
                        placeholder="搜索人员(可添加多个)"
                        values={value}
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
