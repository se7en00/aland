import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { paginationSetting } from 'utils';
import { getLinkByName, PANEL_TITLE, PATHNAME } from 'constants';
import panelStyle from 'layout/main/Main.scss';
import Header from '../shared/panel/PanelHeader';
import OneClickSearch from './OneClickSearch';
import OneClickTable from './OneClickTable';


class OneClickList extends Component {
    componentDidMount() {
        const {actions:{getLecturers}} = this.props;
        this.props.actions.getOneClickList(paginationSetting.pageSize).then(() => getLecturers());;
    }

    onSearch = (values) => {
        const {setSearchParamsToRedux, getOneClickList} = this.props.actions;
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
        getOneClickList({pageSize: paginationSetting.pageSize, ...params})
            .then(() => setSearchParamsToRedux(params));
    }


    redirect = () => {
        this.props.actions.push(`${getLinkByName(PATHNAME.ONE_CLICK)}/add`);
    };

    render() {

        const {oneClick: {list, userLecturers, searchParams}, actions} = this.props;
        return (
            <Fragment>
                <Header title={PANEL_TITLE.ONE_CLICK}/>
                <div className={panelStyle.panel__body}>
                    <OneClickSearch onSubmit={this.onSearch} userLecturers={userLecturers?userLecturers.elements:[]}/>
                    <Button onClick={this.redirect} type="primary" className="editable-add-btn u-pull-down-md" ghost>新增一点通</Button>
                    <OneClickTable dataSource={list} actions={actions} searchParams={searchParams}/>
                </div>
            </Fragment>
        );
    }
}

OneClickList.propTypes = {
    actions: PropTypes.objectOf(PropTypes.func),
    oneClick: PropTypes.object
};

export default OneClickList;
