import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dialog from '../dialog';
import { getUserList, createUser, deleteUser, syncGetCurrentEditUser, updateUser } from './userListaction';
import UserList from './UerList';
import CreateAccountDialog from './dialog/CreateUserDialog';
import PermissionDialog from './dialog/PermissionDialog';
import EditUserDialog from './dialog/EditUserDialog';

@connect(state => ({userList: state.userList}), mapDispatchToProps)
@Dialog(<CreateAccountDialog/>, <EditUserDialog/>, <PermissionDialog/>)
class UserListView extends Component {
    render() {
        return <UserList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({getUserList, createUser, deleteUser, syncGetCurrentEditUser, updateUser}, dispatch) };
}

export default UserListView;
