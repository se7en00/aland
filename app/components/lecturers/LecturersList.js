import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PATHNAME, getLinkByName } from 'constants';
import { paginationSetting } from 'utils';
import { Button } from 'antd';
import panelStyle from '../../layout/main/Main.scss';
import Header from '../shared/panel/PanelHeader';
import LecturersListTable from './LecturersListTable';
import LecturersSearch from './LecturersSearch';

class LecturersList extends Component {
    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func),
        lecturers: PropTypes.object
    };

    componentDidMount() {
        this.props.actions.getLecturersList({pageSize: paginationSetting.pageSize});
    }

    onSearch = (values) => {
        const { setSearchParamsToRedux, getLecturersList} = this.props.actions;
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
        getLecturersList({pageSize: paginationSetting.pageSize, ...params})
            .then(() => setSearchParamsToRedux(params));
    };

    redirect = () => {
        this.props.actions.push(`${getLinkByName(PATHNAME.MASTER)}/add`);
    };

    render() {
        const {lecturers: {list, searchParams}, actions} = this.props;
        return (
            <div>
                <Header title={PATHNAME.MASTER}/>
                <div className={panelStyle.panel__body}>
                    <LecturersSearch onSubmit={this.onSearch}/>
                    <Button onClick={this.redirect} type="primary" className="editable-add-btn u-pull-down-md" ghost>新增培训师</Button>
                    <Button type="primary" className="editable-add-btn u-pull-down-md" ghost>导出数据</Button>
                    <LecturersListTable dataSource={list} actions={actions} searchParams={searchParams}/>
                </div>
            </div>
        );
    }
}

export default LecturersList;
