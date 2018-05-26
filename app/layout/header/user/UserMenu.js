import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import { LogoutView } from 'components/login';
import { syncGetAssociatedUser } from 'components/userList/userListAction';
import ResetUserPassword from 'components/userList/dialog/ResetUserPassword';
import Dialog from 'components/dialog';
import UserAvatar from './UserAvatar';
import style from './User.scss';

const SubMenu = Menu.SubMenu;

@connect(null, {syncGetAssociatedUser})
@Dialog(ResetUserPassword)
class UserMenu extends Component {
    static propTypes = {
        showDialog: PropTypes.func,
        syncGetAssociatedUser: PropTypes.func
    };

    openResetPwdDialog = () => {
        const user = localStorage.getItem('token');
        this.props.syncGetAssociatedUser(user);
        this.props.showDialog()();
    }

    render() {
        return (
            <Menu mode="horizontal" className={style.userMenu}>
                <SubMenu title={<UserAvatar/>}>
                    <Menu.Item key="setting:1"><LogoutView/></Menu.Item>
                    <Menu.Item key="setting:2" onClick={this.openResetPwdDialog}>修改密码</Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
}

export default UserMenu;
