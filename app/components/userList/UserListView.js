import React, {Component} from 'react';
import { connect } from 'react-redux';
import Dialog from '../dialog';
import { getUserList } from './UserListAction';
import UserList from './UerList';
import CreateAccountDialog from './dialog/CreateAccountDialog';
import PermissionDialog from './dialog/PermissionDialog';

@connect(state => ({userList: state.userList}), {getUserList})
@Dialog(<CreateAccountDialog/>, <PermissionDialog/>)
class UserListView extends Component {
    render() {
        return <UserList {...this.props}/>;
    }
}

export default UserListView;
