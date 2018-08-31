import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { DIALOG } from 'constants';
import OnlineLessonsPointsTable from './OnlineLessonsPointsTable';

class OnlineLessonNodes extends Component {
    render() {
        const {showDialog, draftOnlineLesson, actions} = this.props;
        const lessonId = draftOnlineLesson?.draftLesson?.id;
        const hasPointsElement = !!draftOnlineLesson?.allNodes;
        const hasChapters = !!draftOnlineLesson?.chapters;
        const hasSections = !!draftOnlineLesson?.sections;
        console.log(draftOnlineLesson)
        return (
            <form>
                <div className="row inputRow">
                    <div className="col-md-8 col-lg-6">
                        <Button htmlType="button" onClick={showDialog(DIALOG.CHAPTER)} name="sectionButton" type="primary" ghost>添加章</Button>
                        <Button htmlType="button" disabled={!hasChapters} onClick={showDialog(DIALOG.SECTION)} name="sectionButton" type="primary" ghost>添加节</Button>
                        <Button htmlType="button" disabled={!hasSections} onClick={showDialog(DIALOG.POINT)} name="sectionButton" type="primary" ghost>添加点</Button>
                    </div>
                </div>
                {
                    hasPointsElement && <OnlineLessonsPointsTable showDialog={showDialog} actions={actions} lessonId={lessonId} dataSource={draftOnlineLesson?.allNodes}/>
                }
            </form>
        );
    }
}

OnlineLessonNodes.propTypes = {
    showDialog: PropTypes.func,
    actions: PropTypes.objectOf(PropTypes.func),
    draftOnlineLesson: PropTypes.object
};
OnlineLessonNodes.defaultProps = {};

export default OnlineLessonNodes;
