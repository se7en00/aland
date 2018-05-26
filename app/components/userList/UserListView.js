import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dialog from '../dialog';
import * as actionCreators from './userListAction';
import UserList from './UerList';
import CreateAccountDialog from './dialog/CreateUserDialog';
import PermissionDialog from './dialog/PermissionDialog';
import EditUserDialog from './dialog/EditUserDialog';
import ResetUserPassword from './dialog/ResetUserPassword';


@connect(state => ({userList: state.userList}), mapDispatchToProps)
@Dialog(<CreateAccountDialog/>, <EditUserDialog/>, <ResetUserPassword/>, <PermissionDialog/>)
class UserListView extends Component {
    render() {
        return <UserList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default UserListView;
