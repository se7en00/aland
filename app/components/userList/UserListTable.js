import React, { PureComponent } from 'react';
// import classNames from 'classnames/bind';
import { Table, Button, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import panelStyle from 'layout/main/Main.scss';
import EditableCell from '../form/table/EditableCell';

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
            dataIndex: 'id',
            width: 70
        }, {
            title: '登录名',
            align: 'center',
            dataIndex: 'username',
            render: (text, record) => (<EditableCell value={text} onChange={this.onCellChange(record.key, 'name')}/>)
        }, {
            title: '账户名',
            align: 'center',
            dataIndex: 'accountName'
        }, {
            title: '操作',
            align: 'center',
            dataIndex: 'operation',
            render: (text, record) => (
                <div>
                    <Button size="small" type="primary" ghost>重置密码</Button>
                    <Button size="small" type="primary" onClick={this.props.showDialog('permission')} ghost>分配菜单</Button>
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                        <Button size="small" type="primary" ghost>删除</Button>
                    </Popconfirm>
                </div>
            )
        }];
    }

    onCellChange = (key, dataIndex) => (value) => {
        const dataSource = [...this.props.dataSource];
        const target = dataSource.find(item => item.key === key);
        if (target) {
            target[dataIndex] = value;
            // this.setState({ dataSource });
        }
    }

    render() {
        const { dataSource } = this.props;
        const columns = this.columns;
        return (
            <div className={panelStyle.panel__body}>
                <Table bordered size="middle" dataSource={dataSource} columns={columns} pagination={{showQuickJumper: true, size: 'default'}}/>
            </div>
        );
    }
}

export default AccountManagementTable;
