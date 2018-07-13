import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators, ExamsList, CreateExamDialog} from 'components/exams';
import Dialog from 'components/shared/dialog';

@connect(state => ({exams: state.exams}), mapDispatchToProps)
@Dialog(<CreateExamDialog/>)
class ExamsView extends Component {
    render() {
        return <ExamsList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default ExamsView;
