import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators, StudentGroupList} from 'components/studentGruop';

@connect(state => ({accountList: state.accountList}), mapDispatchToProps)
class StudentGroupView extends Component {
    render() {
        return <StudentGroupList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default StudentGroupView;
