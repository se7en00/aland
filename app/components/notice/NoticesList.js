import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DATE_FORMAT, PATHNAME, getLinkByName } from 'constants';
import { paginationSetting } from 'utils';
import { Button } from 'antd';
import panelStyle from '../../layout/main/Main.scss';
import Header from '../shared/panel/PanelHeader';
import NoticesSearch from './NoticesSearch';
import NoticesListTable from './NoticesListTable';

class NoticesList extends Component {
    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func),
        notices: PropTypes.object
    };

    componentDidMount() {
        const { actions: { getNoticesList } } = this.props;
        getNoticesList({pageSize: paginationSetting.pageSize});
    }

    onSearch = (values) => {
        const { setSearchParamsToRedux, getNoticesList} = this.props.actions;
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
        getNoticesList({pageSize: paginationSetting.pageSize, ...params})
            .then(() => setSearchParamsToRedux(params));
    };

    redirect = () => {
        this.props.actions.push(`${getLinkByName(PATHNAME.NOTES_MANAGEMENT)}/add`);
    };

    render() {
        const {notices: {list, searchParams}, actions} = this.props;
        return (
            <div>
                <Header title={PATHNAME.NOTES_MANAGEMENT}/>
                <div className={panelStyle.panel__body}>
                    <NoticesSearch onSubmit={this.onSearch}/>
                    <Button onClick={this.redirect} type="primary" className="editable-add-btn u-pull-down-md" ghost>新增通知信息</Button>
                    <NoticesListTable dataSource={list} actions={actions} searchParams={searchParams}/>
                </div>
            </div>
        );
    }
}

export default NoticesList;
