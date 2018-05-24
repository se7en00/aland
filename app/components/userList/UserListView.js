import React, {Component} from 'react';
import { connect } from 'react-redux';
import Dialog from '../dialog';
import { getUserList, createUser } from './UserListAction';
import UserList from './UerList';
import CreateAccountDialog from './dialog/CreateUserDialog';
import PermissionDialog from './dialog/PermissionDialog';

@connect(state => ({userList: state.userList}), {getUserList, createUser})
@Dialog(<CreateAccountDialog/>, <PermissionDialog/>)
class UserListView extends Component {
    render() {
        return <UserList {...this.props}/>;
    }
}

export default UserListView;
