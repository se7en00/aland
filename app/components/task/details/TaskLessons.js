import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { DIALOG } from 'constants';
import TaskLessTable from './TaskLessTable';

class TaskLessons extends Component {
    componentDidMount() {
        const {actions: {loadRelatedLessons}} = this.props;
        loadRelatedLessons();
    }

    render() {
        const {showDialog, actions, tasks} = this.props;
        let taskId;
        let lessons = [];
        if (tasks?.taskDetails) {
            taskId = tasks.taskDetails.id;
            if (tasks.taskDetails.courses && tasks.taskDetails.courses.length > 0) {
                lessons = lessons.concat(tasks.taskDetails.courses);
            }

            if (tasks.taskDetails.pedias && tasks.taskDetails.pedias.length > 0) {
                lessons = lessons.concat(tasks.taskDetails.pedias);
            }
        }
        return (
            <form>
                <div className="row inputRow">
                    <div className="col-md-8 col-lg-6">
                        <Button htmlType="button" onClick={showDialog(DIALOG.TASK_LESSONS)} type="primary" ghost>添加课件</Button>
                    </div>
                </div>
                {
                    lessons.length > 0 && <TaskLessTable showDialog={showDialog} taskId={taskId} actions={actions} dataSource={lessons}/>
                }
            </form>
        );
    }
}

TaskLessons.propTypes = {
    showDialog: PropTypes.func,
    tasks: PropTypes.object,
    actions: PropTypes.objectOf(PropTypes.func)
};

export default TaskLessons;
