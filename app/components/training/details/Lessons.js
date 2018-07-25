import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { DIALOG } from 'constants';
import LessonsTable from './LessonsTable';


class Lessons extends Component {
    render() {
        const {showDialog, actions, lessons} = this.props;
        const hasLessons = !!lessons;
        return (
            <form>
                <div className="row inputRow">
                    <div className="col-md-8 col-lg-6">
                        <Button htmlType="button" onClick={showDialog(DIALOG.TRAINING_LESSON)} type="primary" ghost>添加课时</Button>
                    </div>
                </div>
                {
                    hasLessons && <LessonsTable showDialog={showDialog} actions={actions} dataSource={lessons}/>
                }
            </form>
        );
    }
}

Lessons.propTypes = {
    showDialog: PropTypes.func,
    lessons: PropTypes.object,
    actions: PropTypes.objectOf(PropTypes.func)
};

export default Lessons;
