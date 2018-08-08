import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DATE_FORMAT, PANEL_TITLE, PATHNAME, getLinkByName, BASE_URL } from 'constants';
import { paginationSetting } from 'utils';
import { Button } from 'antd';
import panelStyle from '../../layout/main/Main.scss';
import Header from '../shared/panel/PanelHeader';
import MaterialsListTable from './MaterialsListTable';
import MaterialsSearch from './MaterialsSearch';

class MaterialsList extends Component {
    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func),
        materials: PropTypes.object
    };

    componentDidMount() {
        this.props.actions.getMaterialsList({pageSize: paginationSetting.pageSize});
    }

    onSearch = (values) => {
        const { setSearchParamsToRedux, getMaterialsList} = this.props.actions;
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
        getMaterialsList({pageSize: paginationSetting.pageSize, ...params})
            .then(() => setSearchParamsToRedux(params));
    };

    redirect = () => {
        const { push } = this.props.actions;
        push(`${getLinkByName(PATHNAME.MATERIALS)}/additionMaterial`);
    }


    export = () => {
       location.href = `${BASE_URL}/api/multimedias/export`;// eslint-disable-line
    }

    render() {
        const {materials: {list, searchParams}, actions} = this.props;
        return (
            <div>
                <Header title={PANEL_TITLE.MATERIALS}/>
                <div className={panelStyle.panel__body}>
                    <MaterialsSearch onSubmit={this.onSearch}/>
                    <Button onClick={this.redirect} type="primary" className="editable-add-btn u-pull-down-md" ghost>新增素材</Button>
                    <Button onClick={this.export} type="primary" className="editable-add-btn u-pull-down-md" ghost>导出素材</Button>
                    <MaterialsListTable dataSource={list} actions={actions} searchParams={searchParams}/>
                </div>
            </div>
        );
    }
}

export default MaterialsList;
