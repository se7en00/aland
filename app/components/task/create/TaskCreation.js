import React, { Component, Fragment } from 'react';
import { PANEL_TITLE} from 'constants';
import PropTypes from 'prop-types';
import { format } from 'utils';
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
        const {tasks, actions: {getTaskDetails, getALLAssociations, getCategories}} = this.props;
        if (/details$/g.test(location.pathname) && !tasks?.isEditable) {
            const taskId = location.pathname.match(/(\w)+(?=\/details$)/g)[0];
            if (taskId) {
                getTaskDetails(taskId);
            }
        }
        getALLAssociations();
        getCategories();
    }

    renderHeaderTitle = () => {
        const {tasks} = this.props;
        if (tasks?.isEditable) {
            return format(PANEL_TITLE.TASK_DETAIL, tasks?.taskDetails?.title || '学习任务内容');
        }
        return PANEL_TITLE.TASK_ADD;
    }

    render() {
        const {tasks, actions, showDialog} = this.props;
        const title = this.renderHeaderTitle();
        return (
            <Fragment>
                <Header title={title}/>
                <div className={panelStyle.panel__body}>
                    <TaskTabs tasks={tasks} actions={actions} showDialog={showDialog}/>
                </div>
            </Fragment>
        );
    }
}

export default TaskCreation;
