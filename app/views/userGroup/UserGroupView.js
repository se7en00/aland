import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators, UserGroupList, UserGroupEditDialog, UserGroupCreateDialog} from 'components/userGruop';
import Dialog from 'components/shared/dialog';

@connect(state => ({userGroup: state.userGroup}), mapDispatchToProps)
@Dialog(<UserGroupCreateDialog/>, <UserGroupEditDialog/>)
class UserGroupView extends Component {
    render() {
        return <UserGroupList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default UserGroupView;
