import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DATE_FORMAT, PATHNAME } from 'constants';
import { paginationSetting } from 'utils';
import { Button } from 'antd';
import panelStyle from '../../layout/main/Main.scss';
import Header from '../shared/panel/PanelHeader';
import ProvidesListTable from './ProvidesListTable';
import ProvidesSearch from './ProvidesSearch';

class ProvidesList extends Component {
    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func),
        provides: PropTypes.object
    };

    componentDidMount() {
        this.props.actions.getProvidesList({pageSize: paginationSetting.pageSize});
    }

    onSearch = (values) => {
        const { setSearchParamsToRedux, getProvidesList} = this.props.actions;
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
        getProvidesList({pageSize: paginationSetting.pageSize, ...params})
            .then(() => setSearchParamsToRedux(params));
    };

    render() {
        const {provides: {list, searchParams}, actions} = this.props;
        return (
            <div>
                <Header title={PATHNAME.VENDOR}/>
                <div className={panelStyle.panel__body}>
                    <ProvidesSearch onSubmit={this.onSearch}/>
                    <Button onClick={this.redirect} type="primary" className="editable-add-btn u-pull-down-md" ghost>新增供应商</Button>
                    <Button onClick={this.redirect} type="primary" className="editable-add-btn u-pull-down-md" ghost>导出数据</Button>
                    <ProvidesListTable dataSource={list} actions={actions} searchParams={searchParams}/>
                </div>
            </div>
        );
    }
}

export default ProvidesList;
