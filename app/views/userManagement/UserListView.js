import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators, UserList} from 'components/userList';

@connect(state => ({accountList: state.accountList}), mapDispatchToProps)
class UserListView extends Component {
    render() {
        return <UserList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default UserListView;
