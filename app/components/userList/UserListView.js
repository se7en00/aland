import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dialog from '../dialog';
import { getUserList, createUser } from './UserListAction';
import UserList from './UerList';
import CreateAccountDialog from './dialog/CreateUserDialog';
import PermissionDialog from './dialog/PermissionDialog';

@connect(state => ({userList: state.userList}), mapDispatchToProps)
@Dialog(<CreateAccountDialog/>, <PermissionDialog/>)
class UserListView extends Component {
    render() {
        return <UserList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({getUserList, createUser}, dispatch) };
}

export default UserListView;
