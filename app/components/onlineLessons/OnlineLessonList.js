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
        // showDialog: PropTypes.func
        actions: PropTypes.objectOf(PropTypes.func),
        onlineLessons: PropTypes.object
    };

    componentDidMount() {
        this.props.actions.getOnlineLessonsList(paginationSetting.pageSize);
    }

    redirect = () => {
        this.props.actions.push(`${getLinkByName(PATHNAME.ONLINE_LESSONS)}/add`);
    }

    render() {
        const {onlineLessons: {list}, actions} = this.props;
        return (
            <Fragment>
                <Header title={PANEL_TITLE.ONLINE_LESSONS}/>
                <div className={panelStyle.panel__body}>
                    <OnlineLessonsSearch/>
                    <Button onClick={this.redirect} type="primary" className="editable-add-btn u-pull-down-md" ghost>新增线上课程</Button>
                    <OnlineLessonsTable dataSource={list} actions={actions}/>
                </div>
            </Fragment>
        );
    }
}

export default OnlineLessonList;
