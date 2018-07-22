import React, { Component } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import PropTypes from 'prop-types';
import { rebuildDataWithKey, paginationSetting } from 'utils';
import { DIALOG } from 'constants';

class SecurityTable extends Component {
    static propTypes = {
        showDialog: PropTypes.func,
        actions: PropTypes.objectOf(PropTypes.func),
        dataSource: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.elements = [];
        this.pagination = {
            ...paginationSetting,
            onChange: this.handelPageChange
        };
        this.columns = [{
            title: '序号',
            align: 'center',
            dataIndex: 'index',
            width: 70
        }, {
            title: '种类名称',
            align: 'center',
            dataIndex: 'code'
        }, {
            title: '对应权限员工级别',
            align: 'center',
            dataIndex: 'name'
        }, {
            title: '操作',
            align: 'center',
            dataIndex: 'operation',
            render: (text, record) => (
                <div>
                    <Button size="small" type="primary" onClick={() => this.openDialog(record)} ghost>编辑</Button>
                    {/*<Button size="small" type="primary" onClick={() => this.openDialog(record, DIALOG.PERMISSION)} ghost>导出名单</Button>*/}
                    <Popconfirm title="你确认要删除吗？" okText="确认" cancelText="取消" onConfirm={() => this.onDelete(record)}>
                        <Button size="small" type="primary" ghost>删除</Button>
                    </Popconfirm>
                </div>
            )
        }];
    }

    openDialog = (securityType) => {
        const {actions: {getDicTypeById}, showDialog} = this.props;
        getDicTypeById(securityType.id).then(() => showDialog(DIALOG.SECURITY_SETTING_DETAILS)());
    }

    componentWillUpdate(nextProps) {
        if (nextProps.dataSource) {
            const { dataSource: {elements = [], paging = {}} } = nextProps;
            this.elements = rebuildDataWithKey(elements);
            const { size: pageSize = 0, total = 0} = paging;
            this.pagination = {...this.pagination, pageSize, total};
        }
    }

    handelPageChange = (page, pageSize) => {
        const { getList } = this.props.actions;
        getList({pageSize, page, dicType: 'LIMIT_TYPE'});
    }


    onDelete = (securityType) => {
        const {
            dataSource: {paging: {size, page}},
            actions: {deleteType, getList}
        } = this.props;
        deleteType(securityType.id, 'LIMIT_TYPE').then(() => {
            message.success(`成功删除保密权限种类：${securityType.code}！`);
            getList({pageSize: size, page, dicType: 'LIMIT_TYPE'});
        }).catch(error => {
            message.error(`删除保密权限种类：${securityType.code}失败！`);
        });
    }

    render() {
        return (
            <Table
                className="u-pull-down-sm"
                bordered
                size="middle"
                dataSource={this.elements}
                columns={this.columns}
                pagination={this.pagination}
            />);
    }
}

export default SecurityTable;
