import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dialog from 'components/shared/dialog';
import { actionCreators, AdminList, CreateAccountDialog, PermissionDialog, EditAccountDialog } from 'components/admins';

@connect(state => ({adminList: state.adminList}), mapDispatchToProps)
@Dialog(<CreateAccountDialog/>, <EditAccountDialog/>, <PermissionDialog/>)
class AdminListView extends Component {
    render() {
        return <AdminList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default AdminListView;
