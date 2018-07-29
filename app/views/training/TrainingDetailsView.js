import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators, TrainingCreation, LessonDialog, LessonEditDialog, LibExamDialog, CustomizeExamDialog, ExamDetailsDialog} from 'components/training';
import Dialog from 'components/shared/dialog';

@connect(state => ({trainings: state.trainings}), mapDispatchToProps)
@Dialog(<LessonDialog/>, <LessonEditDialog/>, <LibExamDialog/>, <CustomizeExamDialog/>, <ExamDetailsDialog/>)
class TrainingDetailsView extends Component {
    render() {
        return <TrainingCreation {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default TrainingDetailsView;
