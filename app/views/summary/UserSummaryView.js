import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators, UserSummaryList} from 'components/usersSummary';
import { push } from 'react-router-redux';

@connect(state => ({userSummary: state.userSummary}), mapDispatchToProps)
class UserSummaryView extends Component {
    render() {
        return <UserSummaryList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({...actionCreators, push}, dispatch) };
}

export default UserSummaryView;
