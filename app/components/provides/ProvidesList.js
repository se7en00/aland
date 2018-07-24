import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DATE_FORMAT, PATHNAME, DIALOG } from 'constants';
import { paginationSetting } from 'utils';
import { Button, message } from 'antd';
import panelStyle from '../../layout/main/Main.scss';
import Header from '../shared/panel/PanelHeader';
import ProvidesListTable from './ProvidesListTable';
import ProvidesSearch from './ProvidesSearch';
import ProvideRateDialog from './ProvideRateDialog';

class ProvidesList extends Component {
    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func),
        provides: PropTypes.object,
        showDialog: PropTypes.func
    };

    state = {
        currentId: '',
        rateDialogVisible: false
    };

    componentDidMount() {
        this.props.actions.getProvidesList({pageSize: paginationSetting.pageSize});
        this.props.actions.getCategories();
        this.props.actions.getProvideInquirys();
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

    editProvide = (provide = {}, type = 'detail') => {
        const { actions: { setCurrentProvide}, showDialog } = this.props;
        if (type === 'detail') {
            setCurrentProvide(provide);
            showDialog(DIALOG.PROVIDE_DETAIL)();
        } else if (type === 'rating') {
            this.showRateDialog(provide.id);
        }
    };

    export = () => {
        const { provides: {list: { paging: {page, size} }, searchParams}, actions: { exportProvides } } = this.props;
        exportProvides({page, size, ...searchParams}).then(() => {
            message.success('导出成功！');
        }).catch(() => {message.success('导出失败！');});
    };

    showRateDialog = (id) => {
        this.setState({
            currentId: id,
            rateDialogVisible: true
        });
    };

    hideRateDialog = () => {
        this.setState({
            rateDialogVisible: false
        });
    };

    submitRate = (data) => {
        const { actions: { rateProvide } } = this.props;
        rateProvide(data).then(() => {
            message.success('打分成功！');
            this.hideRateDialog();
        }).catch(() => {message.success('打分失败！');});
    };

    render() {
        const {provides: {list, searchParams, inquirys}, actions } = this.props;
        const { currentId, rateDialogVisible } = this.state;
        return (
            <div>
                <Header title={PATHNAME.VENDOR}/>
                <div className={panelStyle.panel__body}>
                    <ProvidesSearch onSubmit={this.onSearch}/>
                    <Button onClick={() => this.editProvide()} type="primary" className="editable-add-btn u-pull-down-md" ghost>新增供应商</Button>
                    <Button onClick={this.export} type="primary" className="editable-add-btn u-pull-down-md" ghost>导出数据</Button>
                    <ProvidesListTable editProvide={this.editProvide} dataSource={list} actions={actions} searchParams={searchParams}/>
                </div>
                <ProvideRateDialog
                    data={inquirys}
                    visible={rateDialogVisible}
                    relativeId={currentId}
                    hideDialog={this.hideRateDialog}
                    handleSubmit={this.submitRate}
                />
            </div>
        );
    }
}

export default ProvidesList;
