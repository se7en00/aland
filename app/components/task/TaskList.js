import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PANEL_TITLE, getLinkByName, PATHNAME } from 'constants';
import { paginationSetting } from 'utils';
import { Button } from 'antd';
import panelStyle from '../../layout/main/Main.scss';
import Header from '../shared/panel/PanelHeader';
import TaskListTable from './TaskListTable';

class TaskList extends Component {
    static propTypes = {
        showDialog: PropTypes.func,
        actions: PropTypes.objectOf(PropTypes.func),
        tasks: PropTypes.object
    };

    componentDidMount() {
        this.props.actions.getTasksList({pageSize: paginationSetting.pageSize});
    }

    redirect = () => {
        const {resetTask, push} = this.props.actions;
        resetTask();
        push(`${getLinkByName(PATHNAME.LEARN_TASK)}/creation`);
    };

    render() {
        const {tasks: {list}, actions, showDialog} = this.props;
        return (
            <div>
                <Header title={PANEL_TITLE.TASK_LIST}/>
                <div className={panelStyle.panel__body}>
                    <Button onClick={this.redirect} type="primary" className="editable-add-btn u-pull-down-md" ghost>新增学习任务</Button>
                    <TaskListTable dataSource={list} actions={actions} showDialog={showDialog}/>
                </div>
            </div>
        );
    }
}

export default TaskList;
