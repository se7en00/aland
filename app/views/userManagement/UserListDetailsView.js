import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators, UserDetails} from 'components/userList';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router';

@connect(state => ({userList: state.userList}), mapDispatchToProps)
@withRouter
class UserListDetailsView extends Component {
    render() {
        return <UserDetails {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({...actionCreators, push}, dispatch) };
}

export default UserListDetailsView;
