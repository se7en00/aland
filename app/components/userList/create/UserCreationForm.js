import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Radio, Select, message } from 'antd';
import { resetSpecificField } from 'utils';
import { reduxForm, Form, Field, SubmissionError } from 'redux-form';
import { PATHNAME, renderOptions, getLinkByName } from 'constants';
import uuid from 'uuid/v4';
import { renderTextField, UploadImageField, renderDateTimeField, renderSelectField } from '../../shared/form';
import AutoSelectSearch from '../../shared/autoSearch/AutoSelectSearch';
import style from './UserCreationForm.scss';
import validate from './UserCreationValidate';

const Option = Select.Option;
const RadioGroup = Radio.Group;

@reduxForm({form: 'userCreation', enableReinitialize: true, validate})
class UserCreationForm extends Component {
    state = {
        gender: '1'
    }

    onGenderChange = (e) => {
        this.setState({gender: e.target.value});
    }

    renderDepartmentsOptions = () => {
        const {departments = []} = this.props;
        return renderOptions('id', 'name')(departments);
    }

    renderUserLevelsOptions = () => {
        const {userLevels = []} = this.props;
        return userLevels.map(item => (
            <Option key={uuid()} value={item}>{item}</Option>
        ));
    }

    renderUserStatusOptions = () => ['试用', '在职', '离职'].map(item => (
        <Option key={uuid()} value={item}>{item}</Option>
    ))

    renderGender = () => {
        const {genders = []} = this.props;
        return genders.map(item => (
            <Radio key={uuid()} value={item.code}>{item.name}</Radio>
        ));
    }

    cancel = () => {
        const {push} = this.props.actions;
        push(`${getLinkByName(PATHNAME.USER_MANAGEMENT)}`);
    }

    filterDept = (inputValue, option) => option.props.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0

    submit = (values) => {
        const {gender} = this.state;
        const defaultParams = {
            isAdmin: 0,
            gender,
            loginName: values.phoneNumber
        };
        const {actions: {createUser, push}} = this.props;
        try {
            if (values.avatarUrl && values.avatarUrl[0]) {
                Object.assign(values, {avatarUrl: values.avatarUrl[0]?.response?.locations[0]});
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
                map[k] = values[k].key;
                map.deptName = values[k].label;
            } else {
                map[k] = values[k];
            }
            return map;
        }, {});
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

    render() {
        const { submitting, handleSubmit, dispatch, error } = this.props;
        const containerClassName = style.userFormContainer;
        const restDateTime = () => resetSpecificField(dispatch, 'userCreation', 'birthday', '');
        const restDept = () => resetSpecificField(dispatch, 'userCreation', 'deptId', '');
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

                        <div className="row">
                            <label htmlFor="s" className="col-md-4 col-lg-3">性别</label>
                            <div className="col-md-8 col-lg-9">
                                <RadioGroup onChange={this.onGenderChange} value={this.state.gender}>
                                    {this.renderGender()}
                                </RadioGroup>
                            </div>
                        </div>

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
                            renderOptions={renderOptions('name', 'name')}
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
                            {this.renderUserStatusOptions()}
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
                            label="课程封面"
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
                            renderOptions={renderOptions('name', 'name')}
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
                            {this.renderUserLevelsOptions()}
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

UserCreationForm.propTypes = {
    actions: PropTypes.objectOf(PropTypes.func),
    handleSubmit: PropTypes.func,
    dispatch: PropTypes.func,
    submitting: PropTypes.bool,
    departments: PropTypes.array,
    userLevels: PropTypes.array,
    genders: PropTypes.array,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

export default UserCreationForm;
