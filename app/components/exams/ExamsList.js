import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DATE_FORMAT, PANEL_TITLE } from 'constants';
import { paginationSetting } from 'utils';
import { Button } from 'antd';
import panelStyle from '../../layout/main/Main.scss';
import Header from '../shared/panel/PanelHeader';
import ExamsListTable from './ExamsListTable';
import ExamsSearch from './ExamsSearch';

class ExamsList extends Component {
    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func),
        exams: PropTypes.object
    };

    componentDidMount() {
        this.props.actions.getExamsList({pageSize: paginationSetting.pageSize});
    }

    onSearch = (values) => {
        const { setSearchParamsToRedux, getExamsList} = this.props.actions;
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
        getExamsList({pageSize: paginationSetting.pageSize, ...params})
            .then(() => setSearchParamsToRedux(params));
    };

    render() {
        const {exams: {list, searchParams}, actions} = this.props;
        return (
            <div>
                <Header title={PANEL_TITLE.MATERIALS}/>
                <div className={panelStyle.panel__body}>
                    <ExamsSearch onSubmit={this.onSearch}/>
                    <Button onClick={this.redirect} type="primary" className="editable-add-btn u-pull-down-md" ghost>新增试题</Button>
                    <Button onClick={this.redirect} type="primary" className="editable-add-btn u-pull-down-md" ghost>导入试题</Button>
                    <ExamsListTable dataSource={list} actions={actions} searchParams={searchParams}/>
                </div>
            </div>
        );
    }
}

export default ExamsList;
