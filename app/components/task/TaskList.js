import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PANEL_TITLE, getLinkByName, PATHNAME } from 'constants';
import { paginationSetting } from 'utils';
import { Button } from 'antd';
import panelStyle from '../../layout/main/Main.scss';
import Header from '../shared/panel/PanelHeader';
import TaskListTable from './TaskListTable';
import TaskSearch from './TaskSearch';
class TaskList extends Component {
    static propTypes = {
        showDialog: PropTypes.func,
        actions: PropTypes.objectOf(PropTypes.func),
        tasks: PropTypes.object
    };

    componentDidMount() {
        const {actions:{getManagers}} = this.props;
        this.props.actions.getTasksList({pageSize: paginationSetting.pageSize}).then(()=>getManagers());
    }

    onSearch = (values) => {
        const {setSearchParamsToRedux, getTasksList} = this.props.actions;
        //search 条件
        const params = Object.keys(values).reduce((map, k) => {
            if (k === 'dateTime') {
                map.startDate = moment(values[k][0]).valueOf();
                map.endDate = moment(values[k][1]).valueOf();
            } else {
                map[k] = values[k];
            }
            return map;
        }, {});
        console.log(params)
        getTasksList({pageSize: paginationSetting.pageSize, ...params})
            .then(() => setSearchParamsToRedux(params));
    }


    redirect = () => {
        const {resetTask, push} = this.props.actions;
        resetTask();
        push(`${getLinkByName(PATHNAME.LEARN_TASK)}/creation`);
    };

    render() {
        const {tasks: {list, userManagers,searchParams}, actions, showDialog} = this.props;
        return (
            <div>
                <Header title={PANEL_TITLE.TASK_LIST}/>
                <div className={panelStyle.panel__body}>
                    <TaskSearch onSubmit={this.onSearch} userManagers={userManagers?userManagers:[]}/>
                    <Button onClick={this.redirect} type="primary" className="editable-add-btn u-pull-down-md" ghost>新增学习任务</Button>
                    <TaskListTable dataSource={list} actions={actions} showDialog={showDialog} searchParams={searchParams}/>
                </div>
            </div>
        );
    }
}

export default TaskList;
