import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import { push } from 'react-router-redux';
import { actionCreators, TaskCreate} from 'components/task';

@connect(state => ({tasks: state.tasks, values: getFormValues('taskCreate')(state)}), mapDispatchToProps)
class TaskAddView extends Component {
    render() {
        return <TaskCreate {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({...actionCreators, push}, dispatch) };
}

export default TaskAddView;
