import React, { Component } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { rebuildDataWithKey, paginationSetting } from 'utils';
import { DIALOG } from 'constants';

class UserListTable extends Component {
    static propTypes = {
        showDialog: PropTypes.func,
        actions: PropTypes.objectOf(PropTypes.func),
        dataSource: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.elements = null;
        this.pagination = {
            ...paginationSetting,
            onChange: this.handelPageChange
        };
        const {showDialog} = this.props;
        this.columns = [{
            title: '序号',
            align: 'center',
            dataIndex: 'index',
            width: 70
        }, {
            title: '登录名',
            align: 'center',
            dataIndex: 'loginName'
        }, {
            title: '账户名',
            align: 'center',
            dataIndex: 'name'
        }, {
            title: '操作',
            align: 'center',
            dataIndex: 'operation',
            render: (text, record) => (
                <div>
                    <Button size="small" type="primary" onClick={() => this.openDialog(record, DIALOG.EDIT_USER)} ghost>编辑</Button>
                    <Button size="small" type="primary" onClick={() => this.openDialog(record, DIALOG.RESET_USER_PASSWORD)} ghost>重置密码</Button>
                    <Button size="small" type="primary" onClick={showDialog('permission')} ghost>分配菜单</Button>
                    <Popconfirm title="你确认要删除吗？" okText="确认" cancelText="取消" onConfirm={() => this.onDelete(record)}>
                        <Button size="small" type="primary" ghost>删除</Button>
                    </Popconfirm>
                </div>
            )
        }];
    }

    shouldComponentUpdate(nextProps) {
        return !R.eqProps('dataSource', nextProps, this.props);
    }

    componentWillUpdate(nextProps) {
        const { dataSource: {elements, paging} } = nextProps;
        this.elements = rebuildDataWithKey(elements);
        const { size: pageSize, total} = paging;
        this.pagination = {...this.pagination, pageSize, total};
    }

    handelPageChange = (page, pageSize) => {
        const { getUserList } = this.props.actions;
        getUserList(pageSize, page);
    }

    openDialog = (user, dialog) => {
        const {showDialog, actions: { syncGetAssociatedUser }} = this.props;
        syncGetAssociatedUser(user);
        showDialog(dialog)();
    }

    onDelete = (record) => {
        const {
            dataSource: {paging: {size, page}},
            actions: {deleteUser, getUserList}
        } = this.props;
        deleteUser(record.id).then(() => {
            message.success(`成功删除账户名：${record.name}！`);
            getUserList(size, page);
        }).catch(error => {
            message.success(`删除账户名：${record.name}失败！`);
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

export default UserListTable;
