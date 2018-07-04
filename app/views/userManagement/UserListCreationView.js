import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators, UserCreation} from 'components/userList';

@connect(state => ({userList: state.userList}), mapDispatchToProps)
class UserListCreationView extends Component {
    render() {
        return <UserCreation {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default UserListCreationView;
