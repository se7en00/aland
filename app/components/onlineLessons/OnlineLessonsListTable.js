import React, { Component } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import { DATE_FORMAT } from 'constants';
import { rebuildDataWithKey, paginationSetting } from 'utils';

class OnlineLessonsListTable extends Component {
    static propTypes = {
        // showDialog: PropTypes.func,
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
            title: '课程名称',
            align: 'center',
            dataIndex: 'name'
        }, {
            title: '状态',
            align: 'center',
            dataIndex: 'courseStatus'
        }, {
            title: '课程讲师',
            align: 'center',
            dataIndex: 'lecturer'
        }, {
            title: '保密权限',
            align: 'center',
            dataIndex: 'secretLevel'
        }, {
            title: '创建人',
            align: 'center',
            dataIndex: 'createUserName'
        }, {
            title: '发布时间',
            align: 'center',
            dataIndex: 'createdAt',
            render: (text, record) => moment(record.createdAt).format(DATE_FORMAT)
        }, {
            title: '操作',
            align: 'center',
            dataIndex: 'operation',
            render: (text, record) => (
                <div>
                    <Button size="small" type="primary" ghost>详情/编辑</Button>
                    <Button size="small" type="primary" ghost>审核</Button>
                    <Popconfirm title="你确认要删除吗？" okText="确认" cancelText="取消" onConfirm={() => this.onDelete(record)}>
                        <Button size="small" type="primary" ghost>删除</Button>
                    </Popconfirm>
                    <Button size="small" type="primary" ghost>保密设置</Button>
                </div>
            )
        }];
    }

    handelPageChange = (page, pageSize) => {
        const { getOnlineLessonsList } = this.props.actions;
        const { searchParams } = this.props;
        getOnlineLessonsList(Object.assign({pageSize, page}, searchParams));
    }

    componentWillUpdate(nextProps) {
        if (nextProps.dataSource) {
            const { dataSource: {elements = [], paging = {}} } = nextProps;
            this.elements = rebuildDataWithKey(elements);
            const { size: pageSize = 0, total = 0 } = paging;
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

export default OnlineLessonsListTable;
