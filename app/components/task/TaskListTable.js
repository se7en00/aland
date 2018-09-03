import React, { Component } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import PropTypes from 'prop-types';
import { rebuildDataWithKey, paginationSetting } from 'utils';
import { DATE_FORMAT, getLinkByName, PATHNAME } from 'constants';

class TaskListTable extends Component {
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
            title: '标题',
            align: 'center',
            dataIndex: 'title'
        }, {
            title: '负责人',
            align: 'center',
            dataIndex: 'manager'
        }, {
            title: '报名人数',
            align: 'center',
            dataIndex: 'receivers'
        }, {
            title: '状态',
            align: 'center',
            dataIndex: 'status'
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
                    <Button size="small" type="primary" onClick={() => this.onEdit(record)} ghost>编辑</Button>
                    {/*<Button size="small" type="primary" onClick={() => this.openDialog(record, DIALOG.PERMISSION)} ghost>导出名单</Button>*/}
                    <Popconfirm title="你确认要删除吗？" okText="确认" cancelText="取消" onConfirm={() => this.onDelete(record)}>
                        <Button size="small" type="primary" ghost>删除</Button>
                    </Popconfirm>
                </div>
            )
        }];
    }

    onEdit = (record) => {
        const {getTaskDetails, push} = this.props.actions;
        getTaskDetails(record.id)
            .then(() => {
                push(`${getLinkByName(PATHNAME.LEARN_TASK)}/${record.id}/details`);
            })
            .catch(error => console.log(error));
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
        const {searchParams}  = this.props;
        const { getTasksList } = this.props.actions;
        console.log(searchParams)
        getTasksList(Object.assign({pageSize, page}, searchParams));

       

    }


    onDelete = (task) => {
        const {
            dataSource: {paging: {size, page}},
            actions: {deleteTask, getTasksList}
        } = this.props;
        deleteTask(task.id).then(() => {
            message.success(`成功删除培训：${task.title}！`);
            getTasksList({pageSize: size, page});
        }).catch(error => {
            message.error(`删除培训：${task.title}失败！`);
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

export default TaskListTable;
