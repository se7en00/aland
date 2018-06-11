import React, { Component } from 'react';
import { Table, Button, message } from 'antd';
import PropTypes from 'prop-types';
import { rebuildDataWithKey, paginationSetting } from 'utils';
import { DIALOG } from 'constants';

class OrgListTable extends Component {
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
            title: '组织架构树',
            align: 'center',
            dataIndex: 'loginName'
        }, {
            title: '部门级别',
            align: 'center',
            dataIndex: 'loginName'
        }, {
            title: '上级部门',
            align: 'center',
            dataIndex: 'loginName'
        }, {
            title: '成本中心',
            align: 'center',
            dataIndex: 'loginName'
        }, {
            title: '通用职位',
            align: 'center',
            dataIndex: 'loginName',
            render: (text, record) => (
                <div>
                    <Button size="small" type="primary" onClick={() => this.openDialog(record, DIALOG.EDIT_USER)} ghost>编辑</Button>
                </div>
            )
        }, {
            title: '设备职位',
            align: 'center',
            dataIndex: 'loginName',
            render: (text, record) => (
                <div>
                    <Button size="small" type="primary" onClick={() => this.openDialog(record, DIALOG.EDIT_USER)} ghost>编辑</Button>
                </div>
            )
        }, {
            title: '质量职位',
            align: 'center',
            dataIndex: 'loginName',
            render: (text, record) => (
                <div>
                    <Button size="small" type="primary" onClick={() => this.openDialog(record, DIALOG.EDIT_USER)} ghost>编辑</Button>
                </div>
            )
        }, {
            title: '工艺职位',
            align: 'center',
            dataIndex: 'name',
            render: (text, record) => (
                <div>
                    <Button size="small" type="primary" onClick={() => this.openDialog(record, DIALOG.EDIT_USER)} ghost>编辑</Button>
                </div>
            )
        }];
    }

    //先不优化了，现在每次打开dialog多会渲染table
    // shouldComponentUpdate(nextProps) {
    //     return !R.eqProps('dataSource', nextProps, this.props);
    // }

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
        getUserList(pageSize, page);
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

    onResetPWD = (user) => {
        const {
            actions: {resetPassword}
        } = this.props;
        resetPassword(user.id, {oldPsd: 'test', newPsd: '123456'}).then(() => {
            message.success(`成功重置账户名：${user.name}的密码！`);
        }).catch(error => {
            message.error(`重置账户名：${user.name}的密码失败！`);
        });
    }


    onDelete = (user) => {
        const {
            dataSource: {paging: {size, page}},
            actions: {deleteUser, getUserList}
        } = this.props;
        deleteUser(user.id).then(() => {
            message.success(`成功删除账户名：${user.name}！`);
            getUserList(size, page);
        }).catch(error => {
            message.error(`删除账户名：${user.name}失败！`);
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

export default OrgListTable;
