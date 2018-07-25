import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { actionCreators, TaskCreation, TaskLessonDialog} from 'components/task';
import Dialog from 'components/shared/dialog';

@connect(state => ({tasks: state.tasks}), mapDispatchToProps)
@Dialog(<TaskLessonDialog/>)
class TaskDetailsView extends Component {
    render() {
        return <TaskCreation {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({...actionCreators, push}, dispatch) };
}

export default TaskDetailsView;
