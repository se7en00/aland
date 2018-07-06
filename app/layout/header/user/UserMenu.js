import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu, Modal, Button, message} from 'antd';
import { actionCreators } from 'components/admins';
import { renderTextField } from 'components/shared/form/index';
import { logout } from 'components/login/redux/loginAction';
import { Form, Field, reduxForm, submit, SubmissionError } from 'redux-form';
import UserAvatar from './UserAvatar';
import style from './User.scss';
import validate from './passwordValidate';

const SubMenu = Menu.SubMenu;
const {syncGetAssociatedUser, resetPassword} = actionCreators;

@connect(state => ({initialValues: state.adminList?.editUser}), {syncGetAssociatedUser, logout, resetPassword})
@reduxForm({form: 'resetSelfPWD', enableReinitialize: true, validate})
class UserMenu extends Component {
    static propTypes = {
        logout: PropTypes.func,
        syncGetAssociatedUser: PropTypes.func,
        resetPassword: PropTypes.func,
        error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        //redux-form 表单有验证错误为true, 相反为false
        invalid: PropTypes.bool,
        //表单是否提交
        submitting: PropTypes.bool,
        dispatch: PropTypes.func,
        //提交表单，由redux-form传入
        handleSubmit: PropTypes.func,
        //redux-form 初始表单值
        initialValues: PropTypes.object
    };

    state = { visible: false }

    showModal = () => {
        const user = localStorage.getItem('user');
        this.props.syncGetAssociatedUser(JSON.parse(user));
        this.setState({
            visible: true
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false
        });
    }

    handleSubmit = ({oldPsd, newPsd}) => {
        const { id, loginName } = this.props.initialValues;
        return this.props.resetPassword(id, {oldPsd, newPsd})
            .then(() => {
                message.success(`修改${loginName}的密码成功！`);
                this.handleCancel();
            })
            .catch(error => {
                if (error?.errorCode === 'password_invalid') {
                    throw new SubmissionError({
                        oldPsd: error?.errorMessage
                    });
                } else {
                    throw new SubmissionError({
                        _error: error?.errorMessage
                    });
                }
            });
    }

    render() {
        const {logout: logoutAction} = this.props;
        const {submitting, handleSubmit, dispatch, error, invalid } = this.props;
        const visible = this.state.visible;
        return (
            <Fragment>
                <Menu mode="horizontal" className={style.userMenu}>
                    <SubMenu title={<UserAvatar/>}>
                        <Menu.Item key="setting:1">
                            <div role="button" tabIndex="0" onClick={logoutAction}>退出</div>
                        </Menu.Item>
                        <Menu.Item key="setting:2">
                            <div role="button" tabIndex="0" onClick={this.showModal}>修改密码</div>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
                {/*由于menu组件有严格的props控制，不能支持showDialog传入到其上, 现把dialog直接写入，现直接把dialog写入
                    https://reactjs.org/warnings/unknown-prop.html*/}
                <Modal
                    visible={visible}
                    width="650px"
                    title="重置密码"
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="submit" disabled={invalid} onClick={() => dispatch(submit('resetSelfPWD'))} loading={submitting} type="primary">保存</Button>,
                        <Button key="back" onClick={this.handleCancel}>取消</Button>
                    ]}
                >
                    <Form name="resetUserPWDForm" onSubmit={handleSubmit(this.handleSubmit)}>
                        {error && <div className="dialogContainer--error"><strong >{error}</strong></div>}

                        <div className="dialogContainer">

                            <Field
                                labelClassName="col-md-2"
                                className="col-md-8"
                                rowClassName="dialogContainer__inputRow"
                                name="oldPsd"
                                component={renderTextField}
                                type="password"
                                placeholder="当前密码"
                                label="当前密码"
                            />

                            <Field
                                labelClassName="col-md-2"
                                className="col-md-8"
                                rowClassName="dialogContainer__inputRow"
                                name="newPsd"
                                component={renderTextField}
                                type="password"
                                placeholder="新密码"
                                label="新密码"
                            />

                            <Field
                                labelClassName="col-md-2"
                                className="col-md-8 offset-md-2"
                                rowClassName="dialogContainer__inputRow"
                                name="newPsd1"
                                component={renderTextField}
                                type="password"
                                placeholder="重复上面的新密码"
                            />

                        </div>
                    </Form>
                </Modal>
            </Fragment>
        );
    }
}

export default UserMenu;
