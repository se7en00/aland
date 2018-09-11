import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PANEL_TITLE, DATE_FORMAT, BASE_URL } from 'constants';
import { paginationSetting } from 'utils';
import { Button } from 'antd';
import panelStyle from '../../layout/main/Main.scss';
import Header from '../shared/panel/PanelHeader';
import SummaryListTable from './SummaryListTable';
import SummarySearch from './SummarySearch';

class SummaryList extends Component {
    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func),
        userSummary: PropTypes.object
    };

    componentDidMount() {
        const {actions: {getSummaryList}} = this.props;
        getSummaryList({pageSize: paginationSetting.pageSize});
    }
    urlEncode = (param, key, encode)=> {
        if (param==null) return '';
        var paramStr = '';
        var t = typeof (param);
        if (t == 'string' || t == 'number' || t == 'boolean') {
            paramStr += '&' + key + '='  + ((encode==null||encode) ? encodeURIComponent(param) : param); 
        } else {
            for (var i in param) {
                var k = key == null ? i : i
                paramStr += this.urlEncode(param[i], k, encode)
            }
        }
        return paramStr;
    
    }
    onSearch = (values) => {
        const {setSearchParamsToRedux, getSummaryList} = this.props.actions;
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
       
        getSummaryList({pageSize: paginationSetting.pageSize, ...params})
            .then(() => setSearchParamsToRedux(params));
        let _params = Object.assign({},params);
        let __params =  JSON.parse(JSON.stringify(_params).replace('key','managerId').replace('label','manager'))
        delete __params.manager.manager;
      
           this.__params = this.urlEncode(__params).slice(1)
        
          
    }

    export = () => {
        if(this.__params){
            
        location.href = `${BASE_URL}/api/userTaskTraining/export?${this.__params}`;// eslint-disable-line
        }else{
            location.href = `${BASE_URL}/api/userTaskTraining/export`;// eslint-disable-line
        }
    }

    render() {
        const {userSummary: {list, searchParams}, actions} = this.props;
        return (
            <div>
                <Header title={PANEL_TITLE.USER_SUMMARY}/>
                <div className={panelStyle.panel__body}>
                    <SummarySearch onSubmit={this.onSearch}/>
                    <Button onClick={this.export} type="primary" className="editable-add-btn u-pull-down-md" ghost>导出</Button>
                    <SummaryListTable dataSource={list} actions={actions} searchParams={searchParams}/>
                </div>
            </div>
        );
    }
}

export default SummaryList;
