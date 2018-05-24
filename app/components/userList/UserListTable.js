import React, { PureComponent } from 'react';
// import classNames from 'classnames/bind';
import { Table, Button, Popconfirm } from 'antd';
import PropTypes from 'prop-types';

class AccountManagementTable extends PureComponent {
    static propTypes = {
        showDialog: PropTypes.func,
        dataSource: PropTypes.array
    };

    constructor(props) {
        super(props);
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
                    <Button size="small" type="primary" ghost>编辑</Button>
                    <Button size="small" type="primary" ghost>重置密码</Button>
                    <Button size="small" type="primary" onClick={this.props.showDialog('permission')} ghost>分配菜单</Button>
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                        <Button size="small" type="primary" ghost>删除</Button>
                    </Popconfirm>
                </div>
            )
        }];
    }

    render() {
        const { dataSource } = this.props;
        const columns = this.columns;
        return <Table className="u-pull-down-sm" bordered size="middle" dataSource={dataSource} columns={columns} pagination={{showQuickJumper: true, size: 'default'}}/>;
    }
}

export default AccountManagementTable;
