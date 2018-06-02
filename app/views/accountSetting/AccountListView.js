import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dialog from 'components/shared/dialog';
import { actionCreators, AccountList, CreateAccountDialog, PermissionDialog, EditAccountDialog } from 'components/accountList';

@connect(state => ({accountList: state.accountList}), mapDispatchToProps)
@Dialog(<CreateAccountDialog/>, <EditAccountDialog/>, <PermissionDialog/>)
class UserListView extends Component {
    render() {
        return <AccountList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default UserListView;
