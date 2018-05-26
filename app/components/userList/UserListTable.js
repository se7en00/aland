import React, { Component } from 'react';
// import classNames from 'classnames/bind';
import { Table, Button, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import { rebuildDataWithKey, paginationSetting } from 'utils';

class UserListTable extends Component {
    static propTypes = {
        showDialog: PropTypes.func,
        onPageChange: PropTypes.func,
        dataSource: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.elements = null;
        this.pagination = {
            ...paginationSetting,
            onChange: this.props.onPageChange
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
                    <Button size="small" type="primary" onClick={showDialog('edit')} ghost>编辑</Button>
                    <Button size="small" type="primary" ghost>重置密码</Button>
                    <Button size="small" type="primary" onClick={showDialog('permission')} ghost>分配菜单</Button>
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
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
