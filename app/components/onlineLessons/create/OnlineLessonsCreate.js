import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import panelStyle from 'layout/main/Main.scss';
import { PANEL_TITLE } from 'constants';
import { format } from 'utils';
import Header from '../../shared/panel/PanelHeader';
import OnlineLessonTab from './OnlineLessonTab';


class OnlineLessonsCreate extends Component {
    componentDidMount() {
        //解决强制刷新后详情页面丢失课程信息
        const {draftOnlineLesson, actions: {getCourseDetails, getCategories}} = this.props;
        if (/details$/g.test(location.pathname) && !draftOnlineLesson?.isEditable) {
            const courseId = location.pathname.match(/(\w)+(?=\/details$)/g)[0];
            if (courseId) {
                getCourseDetails(courseId);
            }
        }
        getCategories().catch(error => console.log(error));
    }

    renderHeaderTitle = () => {
        const {draftOnlineLesson} = this.props;
        if (draftOnlineLesson?.isEditable) {
            return format(PANEL_TITLE.ONLINE_LESSONS_DETAILS, draftOnlineLesson?.draftLesson?.name);
        }
        return PANEL_TITLE.ONLINE_LESSONS_ADD;
    }

    render() {
        const {draftOnlineLesson, actions, showDialog} = this.props;
        const title = this.renderHeaderTitle();
        return (
            <Fragment>
                <Header title={title}/>
                <div className={panelStyle.panel__body}>
                    <OnlineLessonTab draftOnlineLesson={draftOnlineLesson} actions={actions} showDialog={showDialog}/>
                </div>
            </Fragment>
        );
    }
}
OnlineLessonsCreate.propTypes = {
    actions: PropTypes.objectOf(PropTypes.func),
    draftOnlineLesson: PropTypes.object,
    showDialog: PropTypes.func
};

export default OnlineLessonsCreate;
