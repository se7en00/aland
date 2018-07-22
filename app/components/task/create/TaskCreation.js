import React, { Component, Fragment } from 'react';
import { PANEL_TITLE, PATHNAME, getLinkByName } from 'constants';
import PropTypes from 'prop-types';
// import { paginationSetting } from 'utils';
import panelStyle from 'layout/main/Main.scss';
import Header from '../../shared/panel/PanelHeader';
import TaskTabs from './TaskTabs';


class TaskCreation extends Component {
    static propTypes = {
        showDialog: PropTypes.func,
        actions: PropTypes.objectOf(PropTypes.func),
        tasks: PropTypes.object
    };

    componentDidMount() {
        this.props.actions.getALLAssociations();
    }

    redirect = () => {
        const {resetDraftLessons, push} = this.props.actions;
        resetDraftLessons();
        push(`${getLinkByName(PATHNAME.ONLINE_LESSONS)}/additionLesson`);
    }

    render() {
        const {tasks, actions, showDialog} = this.props;
        return (
            <Fragment>
                <Header title={PANEL_TITLE.TASK_ADD}/>
                <div className={panelStyle.panel__body}>
                    <TaskTabs tasks={tasks} actions={actions} showDialog={showDialog}/>
                </div>
            </Fragment>
        );
    }
}

export default TaskCreation;
