import React, { Component } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import PropTypes from 'prop-types';
import { rebuildDataWithKey, paginationSetting } from 'utils';
import { DATE_FORMAT, EXAM_TYPE_MAPPING } from 'constants';

class ExamsListTable extends Component {
    static propTypes = {
        // showDialog: PropTypes.func,
        searchParams: PropTypes.object,
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
            title: '试题题目',
            align: 'center',
            dataIndex: 'question'
        }, {
            title: '标签',
            align: 'center',
            dataIndex: 'productTags'
        }, {
            title: '出题人',
            align: 'center',
            dataIndex: 'createUserName'
        }, {
            title: '题型',
            align: 'center',
            dataIndex: 'type',
            render: (text, record) => EXAM_TYPE_MAPPING[record.type]
        }, {
            title: '创建时间',
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
        const { getMaterialsList } = this.props.actions;
        getMaterialsList(pageSize, page);
        const { searchParams } = this.props;
        getMaterialsList(Object.assign({pageSize, page}, searchParams));
    }

    onDelete = (exam) => {
        const {
            dataSource: {paging: {size, page}},
            actions: {deleteExam, getExamsList}
        } = this.props;
        deleteExam(exam.id).then(() => {
            message.success(`成功删除试题：${exam.question}！`);
            getExamsList(size, page);
        }).catch(error => {
            message.error(`删除试题：${exam.question}失败！`);
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

export default ExamsListTable;
