import React, { Component } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import { rebuildDataWithKey, paginationSetting } from 'utils';
import { DATE_FORMAT, getLinkByName, PATHNAME } from 'constants';
// import { DIALOG } from 'constants';

class OneClickTable extends Component {
    static propTypes = {
        // showDialog: PropTypes.func,
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
            title: '主题',
            align: 'center',
            dataIndex: 'subject'
        }, {
            title: '种类',
            align: 'center',
            dataIndex: 'category'
        }, {
            title: '状态',
            align: 'center',
            dataIndex: 'status'
        }, {
            title: '保密权限',
            align: 'center',
            dataIndex: 'secretLevel'
        }, {
            title: '创建人',
            align: 'center',
            dataIndex: 'createUserName'
        }, {
            title: '创建时间',
            align: 'center',
            dataIndex: 'createdAt',
            width:170,
            render: (text, record) => moment(record.createdAt).format(DATE_FORMAT)
        }, {
            title: '操作',
            align: 'center',
            dataIndex: 'operation',
            render: (text, record) => (
                <div>
                    <Button size="small" type="primary" onClick={() => this.redirect(record.id)} ghost>详情</Button>
                    <Button size="small" type="primary" ghost>审核</Button>
                    <Popconfirm title="你确认要删除吗？" okText="确认" cancelText="取消" onConfirm={() => this.onDelete(record)}>
                        <Button size="small" type="primary" ghost>删除</Button>
                    </Popconfirm>
                    <Button size="small" type="primary" ghost>保密设置</Button>
                </div>
            )
        }];
    }

    redirect = (id) => {
        this.props.actions.push(`${getLinkByName(PATHNAME.ONE_CLICK)}/${id}/detail`);
    }

    handelPageChange = (page, pageSize) => {
        const { getUserList } = this.props.actions;
        getUserList(pageSize, page);
    };

    componentWillUpdate(nextProps) {
        if (nextProps.dataSource) {
            const { dataSource: {elements = [], paging = {}} } = nextProps;
            this.elements = rebuildDataWithKey(elements);
            const { size: pageSize = 0, total = 0} = paging;
            this.pagination = {...this.pagination, pageSize, total};
        }
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
            />
        );
    }
}

export default OneClickTable;
