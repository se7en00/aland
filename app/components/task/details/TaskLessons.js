import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { DIALOG } from 'constants';
import TaskLessTable from './TaskLessTable';

class TaskLessons extends Component {
    render() {
        const {showDialog, actions, lessons} = this.props;
        const hasLessons = !!lessons;
        return (
            <form>
                <div className="row inputRow">
                    <div className="col-md-8 col-lg-6">
                        <Button htmlType="button" onClick={showDialog(DIALOG.TRAINING_LESSON)} type="primary" ghost>添加课件</Button>
                    </div>
                </div>
                {
                    hasLessons && <TaskLessTable showDialog={showDialog} actions={actions} dataSource={lessons}/>
                }
            </form>
        );
    }
}

TaskLessons.propTypes = {
    showDialog: PropTypes.func,
    lessons: PropTypes.object,
    actions: PropTypes.objectOf(PropTypes.func)
};

export default TaskLessons;
