import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { actionCreators, TaskCreation} from 'components/task';

@connect(state => ({tasks: state.tasks}), mapDispatchToProps)
class TaskAddView extends Component {
    render() {
        return <TaskCreation {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({...actionCreators, push}, dispatch) };
}

export default TaskAddView;
