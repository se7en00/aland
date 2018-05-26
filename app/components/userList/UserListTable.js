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
                    <Button size="small" type="primary" onClick={() => this.onEdit(record)} ghost>编辑</Button>
                    <Button size="small" type="primary" ghost>重置密码</Button>
                    <Button size="small" type="primary" onClick={showDialog('permission')} ghost>分配菜单</Button>
                    <Popconfirm title="确认要删除吗？" okText="确认" cancelText="取消" onConfirm={() => this.onDelete(record)}>
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
        const { count: pageSize, total} = paging;
        this.pagination = {...this.pagination, pageSize, total};
    }

    handelPageChange = (page, pageSize) => {
        const { getUserList } = this.props.actions;
        getUserList(pageSize, page);
    }

    onEdit = (user) => {
        const {showDialog, actions: { syncGetCurrentEditUser }} = this.props;
        syncGetCurrentEditUser(user);
        showDialog(DIALOG.EDIT_USER)();
    }

    onDelete = (record) => {
        const {
            dataSource: {paging: {start, count}},
            actions: {deleteUser, getUserList}
        } = this.props;
        const currentPage = start / count + 1;//eslint-disable-line
        deleteUser(record.id).then(() => {
            message.success(`成功删除账户名：${record.name}！`);
            getUserList(count, currentPage);
        }).catch(error => {
            message.success(`删除账户名：${record.name}失败！`);
        });
        // this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
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
