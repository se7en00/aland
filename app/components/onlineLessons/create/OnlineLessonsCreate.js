import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import panelStyle from 'layout/main/Main.scss';
import { PANEL_TITLE } from 'constants';
import Header from '../../shared/panel/PanelHeader';
import OnlineLessonTab from './OnlineLessonTab';

class OnlineLessonsCreate extends Component {
    componentDidMount() {
        this.props.actions.getCategories()
            .catch(error => console.log(error));
    }

    render() {
        const {draftOnlineLesson, actions, showDialog} = this.props;
        return (
            <Fragment>
                <Header title={PANEL_TITLE.ONLINE_LESSONS_ADD}/>
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
