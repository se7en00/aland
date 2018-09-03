import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DATE_FORMAT, PATHNAME, getLinkByName } from 'constants';
import { paginationSetting } from 'utils';
import { Button } from 'antd';
import panelStyle from '../../layout/main/Main.scss';
import Header from '../shared/panel/PanelHeader';
import InquiriesListTable from './InquiriesListTable';
import InquiriesSearch from './InquiriesSearch';

class InquiriesList extends Component {
    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func),
        inquiries: PropTypes.object
    };

    componentDidMount() {
        this.props.actions.getInquiryesList({pageSize: paginationSetting.pageSize});
        this.props.actions.getCategories();
    }

    onSearch = (values) => {
        const { setSearchParamsToRedux, getInquiryesList} = this.props.actions;
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
        getInquiryesList({pageSize: paginationSetting.pageSize, ...params})
            .then(() => setSearchParamsToRedux(params));
    };

    redirect = () => {
        this.props.actions.push(`${getLinkByName(PATHNAME.QUESTIONNAIRE_BANK)}/add`);
    };

    render() {
        const {inquiries: {list, searchParams, categoryList}, actions} = this.props;
        return (
            <div>
                <Header title={PATHNAME.QUESTIONNAIRE_BANK}/>
                <div className={panelStyle.panel__body}>
                    <InquiriesSearch categoryList={categoryList} onSubmit={this.onSearch}/>
                    <Button onClick={this.redirect} type="primary" className="editable-add-btn u-pull-down-md" ghost>新增问卷</Button>
                    <InquiriesListTable dataSource={list} actions={actions} searchParams={searchParams}/>
                </div>
            </div>
        );
    }
}

export default InquiriesList;
