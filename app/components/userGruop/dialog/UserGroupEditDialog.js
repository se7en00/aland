import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form, clearSubmitErrors, reset, submit, SubmissionError } from 'redux-form';
import { DIALOG, renderOptions } from 'constants';
import { Modal, Button, message } from 'antd';
import { paginationSetting, resetSpecificField } from 'utils';
import { connect } from 'react-redux';
import { renderTextField } from '../../shared/form';
import AutoSelectSearch from '../../shared/autoSearch/AutoSelectSearch';
import AutoTreeSelect from '../../shared/autoSearch/AutoTreeSelect';
import validate from "../../admins/dialog/accountValidate";

const required = value => (value ? undefined : '不能为空！');


const mapStateToProp = (state) => {
    if (R.isEmpty(state.userGroup) || !state?.userGroup?.userGroupDetails) return null;
    const { userGroupDetails } = state.userGroup;
    if (userGroupDetails.userInfoList && userGroupDetails.userInfoList?.length > 0) {
        userGroupDetails.users = userGroupDetails.userInfoList.map(item => ({key: item.id, label: item.name}));
    }
    return {
        initialValues: {
            title: userGroupDetails.title,
            description: userGroupDetails.description,
            users: userGroupDetails.users
        },
        userGroupId: userGroupDetails.id || '',
        users:userGroupDetails.users
    };
};

@connect(mapStateToProp)
@reduxForm({form: DIALOG.EDIT_USER_GROUP, enableReinitialize: true, validate})
class UserGroupEditDialog extends Component {
    static dialogName = DIALOG.EDIT_USER_GROUP;

    closeDialog = () => {
        this.props.dispatch(clearSubmitErrors(DIALOG.EDIT_USER_GROUP));
        this.props.dispatch(reset(DIALOG.EDIT_USER_GROUP));
        this.props.hideDialog(DIALOG.EDIT_USER_GROUP)();
    }
    componentDidMount(){
        
        // console.log(this.refs.autotreeselect)
    }
    componentWillUpdate(){
        console.log(this.props.users)
    }
    popUserIds(obj){
        
        this.extendObj = obj;
    }
    submit= (values) => {
        const {actions: {updateUserGroup, getUserGroupList}, userGroupId,users} = this.props;
        console.log(values);
        if(this.extendObj){
            values[this.extendObj.name] = this.extendObj.value;
        }
       
        //return;
        // if (values.users) {
        //     const ids = values.users.map(id => id.key);
        //     Object.assign(values, {userIds: ids});
        // }
        return updateUserGroup(userGroupId, values)
            .then(() => {
                message.success(`更新群组${values.title}成功！`);
                this.closeDialog();
              //  this.refs.autotreeselect2.resetaction([]);
                getUserGroupList({pageSize: paginationSetting.pageSize});
            })
            .catch(error => {
                throw new SubmissionError({
                    _error: error?.errorMessage || `更新群组${values.title}成功！`
                });
            });
    }

    render() {
        const {submitting, handleSubmit, visible, width, error, dispatch,users} = this.props;
        const resetPersonValue = () => resetSpecificField(dispatch, DIALOG.EDIT_USER_GROUP, 'userIds', '');
         console.log(users)
         const ids = users && users.length>0 && users.map(id => id.key);
         console.log(ids)
        // this.refs.autotreeselect.resetaction([]);
        return (
            <Modal
                visible={visible}
                width={width}
                title="更新群组"
                onCancel={this.closeDialog}
                footer={[
                    <Button key="submit" onClick={() => dispatch(submit(DIALOG.EDIT_USER_GROUP))} loading={submitting} type="primary">保存</Button>,
                    <Button key="back" onClick={this.closeDialog}>取消</Button>
                ]}
            >
                <Form onSubmit={handleSubmit(this.submit)}>
                    {error && <div className="dialogContainer--error"><strong >{error}</strong></div>}

                    <div className="dialogContainer">
                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="title"
                            component={renderTextField}
                            type="text"
                            placeholder="标题"
                            label="标题"
                            validate={required}
                        />

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="description"
                            style={{alignItems: 'flex-start'}}
                            rows="3"
                            component={renderTextField}
                            type="textarea"
                            label="描述"
                        />

                        {/* <AutoSelectSearch
                            api="/api/users"
                            query="name"
                            mode="multiple"
                            resetSelectValue={resetPersonValue}
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="users"
                            placeholder="搜索人员(可添加多个)"
                            label="人员"
                            validate={required}
                            renderOptions={renderOptions('id', 'name')}
                        /> */}

                         <AutoTreeSelect
                            api="/api/departments/users"
                            label="人员"
                            mode="multiple"
                            popUserIds={this.popUserIds.bind(this)}
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="userIds"
                            placeholder="搜索人员(可添加多个)"
                            refs="autotreeselect2"
                            values={ids}
                        />
                        
                    </div>
                </Form>
            </Modal>
        );
    }
}

UserGroupEditDialog.propTypes = {
    hideDialog: PropTypes.func,
    handleSubmit: PropTypes.func,
    visible: PropTypes.bool,
    submitting: PropTypes.bool,
    actions: PropTypes.objectOf(PropTypes.func),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    dispatch: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    userGroupId: PropTypes.string
};

export default UserGroupEditDialog;
