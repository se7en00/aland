import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Radio, Select, message } from 'antd';
import { resetSpecificField } from 'utils';
import { reduxForm, Form, Field, SubmissionError } from 'redux-form';
import { PATHNAME, renderOptions, getLinkByName, renderOptionsExtend } from 'constants';
import uuid from 'uuid/v4';
import { renderTextField, UploadImageField, renderDateTimeField, renderSelectField, renderRadioGroupField } from '../shared/form/index';
import AutoSelectSearch from '../shared/autoSearch/AutoSelectSearch';
import style from './create/UserCreationForm.scss';
import validate from './create/UserCreationValidate';

const Option = Select.Option;

@reduxForm({form: 'userCreation', enableReinitialize: true, validate})
class UserInfoForm extends Component {
    renderDepartmentsOptions = () => {
        const {associations} = this.props;
        if (!associations?.departments) return;
        return renderOptions('id', 'name')(associations.departments);
    }

    renderUserGroupOptions = () => {
        const {associations} = this.props;
        if (!associations?.userGroups) return;
        return renderOptions('id', 'name')(associations.userGroups);
    }

    renderOptions = (options = []) => options.map(item => (
        <Option key={uuid()} value={item}>{item}</Option>
    ))

    renderGender = () => {
        const {associations} = this.props;
        if (!associations?.genders) return;
        return associations.genders.map(item => (
            <Radio key={uuid()} value={item.code}>{item.name}</Radio>
        ));
    }

    cancel = () => {
        const {push} = this.props.actions;
        push(`${getLinkByName(PATHNAME.USER_MANAGEMENT)}`);
    }

    filterDept = (inputValue, option) => option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0

    submit = (values) => {
        const defaultParams = {
            isAdmin: 0,
            loginName: values.phoneNumber
        };
        let deptName;
        if(values.gender == null){
            values.gender = this.props.defaultGender;
        }
        const {actions: {createUser, updateUser, push}, isCreate} = this.props;
        try {
            if (!values.avatarUrl || R.isEmpty(values.avatarUrl)) {
                Object.assign(values, {avatarUrl: null});
            } else {
                Object.assign(values, {avatarUrl: values.avatarUrl[0]?.response?.locations[0] || ''});
            }
        } catch (error) {
            throw new SubmissionError({cover: '上传图片失败！'});
        }

        const params = Object.keys(values).reduce((map, k) => {
            if (k === 'birthday' || k === 'entryDate' || k === 'workDate') {
                map[k] = moment(values[k]).valueOf();
            } else if (k === 'administrationSuperior' || k === 'deptSuperior') {
                map[k] = values[k].label;
            } else if (k === 'deptId') {
                console.log(k)
                console.log(values)
                map[k] = values[k].key;
                map.deptName = values[k].label;
                deptName = map.deptName;
            } else if (k === 'userGroupId') {
                map[k] = values[k].key;
                map.userGroupName = values[k].label;
            } else {
                map[k] = values[k];
            }
            return map;
        }, {});
        if(deptName){
        params.deptName = deptName;
        }
        console.log(params)
        if (isCreate) {
            return createUser(Object.assign(params, defaultParams))
                .then(() => {
                    message.success(`创建人员${values.name}成功！`);
                    push(`${getLinkByName(PATHNAME.USER_MANAGEMENT)}`);
                })
                .catch(error => {
                    throw new SubmissionError({
                        _error: error?.errorMessage || '创建人员失败！'
                    });
                });
        }

        return updateUser(params.id, Object.assign(params, defaultParams))
            .then(() => {
                message.success(`更新人员${values.name}成功！`);
            })
            .catch(error => {
                throw new SubmissionError({
                    _error: error?.errorMessage || '更新人员失败！'
                });
            });
    }

    render() {
        const { submitting, handleSubmit, dispatch, error, associations } = this.props;
        const containerClassName = style.userFormContainer;
        const restDateTime = () => resetSpecificField(dispatch, 'userCreation', 'birthday', '');
        const restDept = () => resetSpecificField(dispatch, 'userCreation', 'deptId', '');
        const restUserGroup = () => resetSpecificField(dispatch, 'userCreation', 'userGroupId', '');
        const restDeptSuperiorValue = () => resetSpecificField(dispatch, 'userCreation', 'eptSuperior', '');
        const restUserLevel = () => resetSpecificField(dispatch, 'userCreation', 'userLevel', '');
        const restEntryDate = () => resetSpecificField(dispatch, 'userCreation', 'entryDate', '');
        const restWorkDate = () => resetSpecificField(dispatch, 'userCreation', 'workDate', '');
        const restUserStatus = () => resetSpecificField(dispatch, 'userCreation', 'userStatus', '');
        const restAdministrationSuperiorValue = () => resetSpecificField(dispatch, 'userCreation', 'administrationSuperior', '');
        return (
            <Form name="form" onSubmit={handleSubmit(this.submit)}>
                {error && <div className="dialogContainer--error"><strong >{error}</strong></div>}
                <div className={containerClassName}>
                    <div className="col-md-6 col-lg-6">
                        <Field
                            className="col-md-8 col-lg-9"
                            labelClassName="col-md-4 col-lg-3"
                            name="name"
                            component={renderTextField}
                            type="text"
                            placeholder="姓名"
                            label="姓名"
                        />

                        <Field
                            className="col-md-8 col-lg-9"
                            labelClassName="col-md-4 col-lg-3"
                            name="gender"
                            defaultValue={this.props.defaultGender}
                            component={renderRadioGroupField}
                            placeholder="性别"
                            label="性别"
                        >
                            {this.renderGender()}
                        </Field>

                        <Field
                            className="col-md-8 col-lg-9"
                            labelClassName="col-md-4 col-lg-3"
                            name="birthday"
                            allowClear={true}
                            resetSelectValue={restDateTime}
                            component={renderDateTimeField}
                            placeholder="出生日期"
                            label="出生日期"
                        />

                        <Field
                            className="col-md-8 col-lg-9"
                            labelClassName="col-md-4 col-lg-3"
                            name="workNum"
                            component={renderTextField}
                            type="text"
                            placeholder="工号"
                            label="工号"
                        />

                        <Field
                            className="col-md-8 col-lg-9"
                            labelClassName="col-md-4 col-lg-3"
                            name="deptId"
                            showSearch={true}
                            labelInValue={true}
                            allowClear={true}
                            filterOption={this.filterDept}
                            resetSelectValue={restDept}
                            component={renderSelectField}
                            placeholder="部门"
                            label="部门"
                        >
                            {this.renderDepartmentsOptions()}
                        </Field>

                        <AutoSelectSearch
                            api="/api/users"
                            query="name"
                            resetSelectValue={restDeptSuperiorValue}
                            className="col-md-8 col-lg-9"
                            labelClassName="col-md-4 col-lg-3"
                            name="deptSuperior"
                            placeholder="搜索职能上级"
                            label="职能上级"
                            renderOptions={renderOptionsExtend('name', 'name', 'workNum')}
                        />

                        <Field
                            className="col-md-8 col-lg-9"
                            labelClassName="col-md-4 col-lg-3"
                            name="userStatus"
                            allowClear={true}
                            resetSelectValue={restUserStatus}
                            component={renderSelectField}
                            placeholder="员工状态"
                            label="员工状态"
                        >
                            {this.renderOptions(associations?.userStatus)}
                        </Field>

                        <Field
                            className="col-md-8 col-lg-9"
                            labelClassName="col-md-4 col-lg-3"
                            name="userType"
                            component={renderTextField}
                            type="text"
                            placeholder="员工类型"
                            label="员工类型"
                        />

                        <Field
                            className="col-md-8 col-lg-9"
                            labelClassName="col-md-4 col-lg-3"
                            name="userCategory"
                            component={renderTextField}
                            type="text"
                            placeholder="员工类别"
                            label="员工类别"
                        />


                        <Field
                            className="col-md-8 col-lg-9"
                            labelClassName="col-md-4 col-lg-3"
                            name="userGroupId"
                            showSearch={true}
                            labelInValue={true}
                            allowClear={true}
                            filterOption={this.filterDept}
                            resetSelectValue={restUserGroup}
                            component={renderSelectField}
                            placeholder="学员群组"
                            label="学员群组"
                        >
                            {this.renderUserGroupOptions()}
                        </Field>

                        <Field
                            className="col-md-8 col-lg-9"
                            labelClassName="col-md-4 col-lg-3"
                            name="city"
                            component={renderTextField}
                            type="text"
                            placeholder="工作城市"
                            label="工作城市"
                        />

                    </div>
                    {/*{second start}*/}
                    <div className="col-md-6 col-lg-6">
                        <Field
                            className="col-md-8 col-lg-9"
                            labelClassName="col-md-4 col-lg-3"
                            accept="image/*"
                            style={{alignItems: 'flex-start'}}
                            name="avatarUrl"
                            uploadFileCount="1"
                            component={UploadImageField}
                            uploadTitle="上传图片"
                            label="头像"
                        />

                        <Field
                            className="col-md-8 col-lg-9"
                            labelClassName="col-md-4 col-lg-3"
                            style={{marginTop: '6px'}}
                            name="post"
                            component={renderTextField}
                            type="text"
                            placeholder="岗位"
                            label="岗位"
                        />

                        <Field
                            className="col-md-8 col-lg-9"
                            labelClassName="col-md-4 col-lg-3"
                            name="phoneNumber"
                            component={renderTextField}
                            type="text"
                            placeholder="联系方式"
                            label="联系方式"
                        />

                        <Field
                            className="col-md-8 col-lg-9"
                            labelClassName="col-md-4 col-lg-3"
                            name="costCenter"
                            component={renderTextField}
                            type="text"
                            placeholder="成本中心"
                            label="成本中心"
                        />

                        <AutoSelectSearch
                            api="/api/users"
                            query="name"
                            resetSelectValue={restAdministrationSuperiorValue}
                            className="col-md-8 col-lg-9"
                            labelClassName="col-md-4 col-lg-3"
                            name="administrationSuperior"
                            placeholder="搜索行政上级"
                            label="行政上级"
                            renderOptions={renderOptionsExtend('name', 'name','workNum')}
                        />

                        <Field
                            className="col-md-8 col-lg-9"
                            labelClassName="col-md-4 col-lg-3"
                            name="userLevel"
                            allowClear={true}
                            resetSelectValue={restUserLevel}
                            component={renderSelectField}
                            placeholder="员工级别"
                            label="员工级别"
                        >
                            {this.renderOptions(associations?.userLevels)}
                        </Field>

                        <Field
                            className="col-md-8 col-lg-9"
                            labelClassName="col-md-4 col-lg-3"
                            name="entryDate"
                            allowClear={true}
                            resetSelectValue={restEntryDate}
                            component={renderDateTimeField}
                            placeholder="入集团日期"
                            label="入集团日期"
                        />

                        <Field
                            className="col-md-8 col-lg-9"
                            labelClassName="col-md-4 col-lg-3"
                            name="workDate"
                            allowClear={true}
                            resetSelectValue={restWorkDate}
                            component={renderDateTimeField}
                            placeholder="从岗日期"
                            label="从岗日期"
                        />

                        <Field
                            className="col-md-8 col-lg-9"
                            labelClassName="col-md-4 col-lg-3"
                            name="email"
                            component={renderTextField}
                            type="text"
                            placeholder="电子邮件"
                            label="电子邮件"
                        />
                    </div>
                </div>
                <div className="u-pull-down-lg">
                    <div className="col-md-8 col-lg-6">
                        <Button onClick={this.cancel} type="primary" className="editable-add-btn" ghost>取消</Button>
                        <Button htmlType="submit" loading={submitting} type="primary" className="editable-add-btn">保存</Button>
                    </div>
                </div>
            </Form>
        );
    }
}

UserInfoForm.propTypes = {
    actions: PropTypes.objectOf(PropTypes.func),
    handleSubmit: PropTypes.func,
    dispatch: PropTypes.func,
    submitting: PropTypes.bool,
    associations: PropTypes.object,
    isCreate: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

export default UserInfoForm;
