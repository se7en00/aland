import React, { Component, Fragment } from 'react';
import { PANEL_TITLE, PATHNAME, getLinkByName } from 'constants';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { paginationSetting } from 'utils';
import panelStyle from 'layout/main/Main.scss';
import Header from '../shared/panel/PanelHeader';
import OnlineLessonsTable from './OnlineLessonsListTable';
import OnlineLessonsSearch from './OnlineLessonsSearch';

class OnlineLessonList extends Component {
    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func),
        onlineLessons: PropTypes.object
    };

    componentDidMount() {
        this.props.actions.getOnlineLessonsList({pageSize: paginationSetting.pageSize});
    }

    onSearch = (values) => {
        const { setSearchParamsToRedux, getOnlineLessonsList} = this.props.actions;
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
        getOnlineLessonsList({pageSize: paginationSetting.pageSize, ...params})
            .then(() => setSearchParamsToRedux(params));
    };

    redirect = () => {
        this.props.actions.push(`${getLinkByName(PATHNAME.ONLINE_LESSONS)}/add`);
    }

    render() {
        const {onlineLessons: {list, searchParams}, actions} = this.props;
        return (
            <Fragment>
                <Header title={PANEL_TITLE.ONLINE_LESSONS}/>
                <div className={panelStyle.panel__body}>
                    <OnlineLessonsSearch onSubmit={this.onSearch}/>
                    <Button onClick={this.redirect} type="primary" className="editable-add-btn u-pull-down-md" ghost>新增线上课程</Button>
                    <OnlineLessonsTable dataSource={list} actions={actions} searchParams={searchParams}/>
                </div>
            </Fragment>
        );
    }
}

export default OnlineLessonList;
