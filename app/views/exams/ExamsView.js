import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators, ExamsList} from 'components/exams';

@connect(state => ({exams: state.exams}), mapDispatchToProps)
class ExamsView extends Component {
    render() {
        return <ExamsList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default ExamsView;
