import React, { Component } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import PropTypes from 'prop-types';
import { rebuildDataWithKey, paginationSetting } from 'utils';
import { DATE_FORMAT, DIALOG } from 'constants';

class UserListTable extends Component {
    static propTypes = {
        showDialog: PropTypes.func,
        actions: PropTypes.objectOf(PropTypes.func),
        dataSource: PropTypes.object,
        searchParams: PropTypes.object
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
            title: '姓名',
            align: 'center',
            dataIndex: 'name'
        }, {
            title: '性别',
            align: 'center',
            dataIndex: 'gender'
        }, {
            title: '手机号',
            align: 'center',
            dataIndex: 'phoneNumber'
        }, {
            title: '部门',
            align: 'center',
            dataIndex: 'deptName'
        }, {
            title: '岗位',
            align: 'center',
            dataIndex: 'post'
        }, {
            title: '工号',
            align: 'center',
            dataIndex: 'workNum'
        }, {
            title: '员工级别',
            align: 'center',
            dataIndex: 'userLevel'
        }, {
            title: '从岗时间',
            align: 'center',
            dataIndex: 'workDate',
            render: (text, record) => moment(record.workDate).format(DATE_FORMAT)
        }, {
            title: '操作',
            align: 'center',
            dataIndex: 'operation',
            render: (text, record) => (
                <div>
                    <Button size="small" type="primary" onClick={() => this.openDialog(record, DIALOG.EDIT_USER)} ghost>查看详情</Button>
                    <Button size="small" type="primary" onClick={() => this.openDialog(record, DIALOG.PERMISSION)} ghost>导出培训数据</Button>
                    <Popconfirm title="你确认要删除吗？" okText="确认" cancelText="取消" onConfirm={() => this.onDelete(record)}>
                        <Button size="small" type="primary" ghost>删除</Button>
                    </Popconfirm>
                </div>
            )
        }];
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
        const { getUserList } = this.props.actions;
        const { searchParams } = this.props;
        getUserList(Object.assign({pageSize, page}, searchParams));
    }

    openDialog = (user, dialog) => {
        const {showDialog, actions: { syncGetAssociatedUser, getPermissions }} = this.props;
        syncGetAssociatedUser(user);
        if (dialog === DIALOG.PERMISSION) {
            getPermissions(user.id).then(() => {
                showDialog(dialog)();
            });
        } else {
            showDialog(dialog)();
        }
    }

    onDelete = (user) => {
        const {
            dataSource: {paging: {size, page}},
            actions: {deleteUser, getUserList}
        } = this.props;
        deleteUser(user.id).then(() => {
            message.success(`成功删除用户：${user.name}！`);
            getUserList(size, page);
        }).catch(error => {
            message.error(`删除用户：${user.name}失败！`);
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
