import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators, UserGroupList} from 'components/userGruop';

@connect(state => ({userGroup: state.userGroup}), mapDispatchToProps)
class StudentGroupView extends Component {
    render() {
        return <UserGroupList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default StudentGroupView;
