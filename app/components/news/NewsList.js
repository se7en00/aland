import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DATE_FORMAT, PATHNAME, getLinkByName } from 'constants';
import { paginationSetting } from 'utils';
import { Button } from 'antd';
import panelStyle from '../../layout/main/Main.scss';
import Header from '../shared/panel/PanelHeader';
import NewsSearch from './NewsSearch';
import NewsListTable from './NewsListTable';

class NewsList extends Component {
    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func),
        news: PropTypes.object
    };

    componentDidMount() {
        const { actions: { getNewsList } } = this.props;
        getNewsList({pageSize: paginationSetting.pageSize});
    }

    onSearch = (values) => {
        const { setSearchParamsToRedux, getNewsList} = this.props.actions;
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
        getNewsList({pageSize: paginationSetting.pageSize, ...params})
            .then(() => setSearchParamsToRedux(params));
    };

    redirect = () => {
        this.props.actions.push(`${getLinkByName(PATHNAME.NEWS_MANAGEMENT)}/add`);
    };

    render() {
        const {news: {list, searchParams}, actions} = this.props;
        return (
            <div>
                <Header title={PATHNAME.NEWS_MANAGEMENT}/>
                <div className={panelStyle.panel__body}>
                    <NewsSearch onSubmit={this.onSearch}/>
                    <Button onClick={this.redirect} type="primary" className="editable-add-btn u-pull-down-md" ghost>新增新闻</Button>
                    <NewsListTable dataSource={list} actions={actions} searchParams={searchParams}/>
                </div>
            </div>
        );
    }
}

export default NewsList;
