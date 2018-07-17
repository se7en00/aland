import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PANEL_TITLE } from 'constants';
import { paginationSetting } from 'utils';
import { Button } from 'antd';
import panelStyle from 'layout/main/Main.scss';
import Header from '../../shared/panel/PanelHeader';
import TrainingUsers from './TrainingUsers';

class TrainingDetails extends Component {
    static propTypes = {
        showDialog: PropTypes.func,
        actions: PropTypes.objectOf(PropTypes.func),
        tasks: PropTypes.object
    };

    componentDidMount() {
        this.props.actions.getTasksList({pageSize: paginationSetting.pageSize});
    }

    render() {
        const {tasks: {list}, actions, showDialog} = this.props;
        return (
            <div>
                <Header title={PANEL_TITLE.TRAINING_DETAILS}/>
                <div className={panelStyle.panel__body}>
                    <Button onClick={this.openCreateDialog} type="primary" className="editable-add-btn u-pull-down-md" ghost>新增学习任务</Button>
                    <TrainingUsers dataSource={list} actions={actions} showDialog={showDialog}/>
                </div>
            </div>
        );
    }
}

export default TrainingDetails;
