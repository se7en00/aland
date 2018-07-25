import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DATE_FORMAT, getLinkByName, PANEL_TITLE, PATHNAME } from 'constants';
import { paginationSetting } from 'utils';
import { Button } from 'antd';
import panelStyle from '../../layout/main/Main.scss';
import Header from '../shared/panel/PanelHeader';
import TrainingSearch from './TrainingSearch';
import TrainingListTable from './TrainingListTable';

class UserGroupList extends Component {
    static propTypes = {
        showDialog: PropTypes.func,
        actions: PropTypes.objectOf(PropTypes.func),
        trainings: PropTypes.object
    };

    componentDidMount() {
        this.props.actions.getTrainingList({pageSize: paginationSetting.pageSize});
    }

    onSearch = (values) => {
        const {setSearchParamsToRedux, getTrainingList} = this.props.actions;
        //search 条件
        const params = Object.keys(values).reduce((map, k) => {
            if (k === 'dateTime') {
                map.startDate = moment(values[k][0]).format(DATE_FORMAT);
                map.endDate = moment(values[k][1]).format(DATE_FORMAT);
            } else {
                map[k] = values[k];
            }
            return map;
        }, {});
        getTrainingList({pageSize: paginationSetting.pageSize, ...params})
            .then(() => setSearchParamsToRedux(params));
    }

    redirect = () => {
        const {push, resetTrainings} = this.props.actions;
        resetTrainings();
        push(`${getLinkByName(PATHNAME.PUBLISHED_TRAINING)}/creation`);
    }

    render() {
        const {trainings: {list}, actions, showDialog} = this.props;
        return (
            <div>
                <Header title={PANEL_TITLE.TRAINING_LIST}/>
                <div className={panelStyle.panel__body}>
                    <TrainingSearch onSubmit={this.onSearch}/>
                    <Button onClick={this.redirect} type="primary" className="editable-add-btn u-pull-down-md" ghost>新增培训</Button>
                    <TrainingListTable dataSource={list} actions={actions} showDialog={showDialog}/>
                </div>
            </div>
        );
    }
}

export default UserGroupList;
