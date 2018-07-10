import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Button, message } from 'antd';
import { rebuildDataWithKey } from 'utils';
import { EXAM_TYPE_MAPPING } from 'constants';

class ExamTable extends Component {
    static propTypes = {
        // showDialog: PropTypes.func,
        actions: PropTypes.objectOf(PropTypes.func),
        courseId: PropTypes.string,
        pointId: PropTypes.string,
        dataSource: PropTypes.array
    };

    constructor(props) {
        super(props);
        this.elements = rebuildDataWithKey(props.dataSource);

        this.columns = [{
            title: '题目',
            align: 'center',
            dataIndex: 'question'
        }, {
            title: '来源',
            align: 'center',
            dataIndex: 'source'
        }, {
            title: '类型',
            align: 'center',
            dataIndex: 'examData.type',
            render: (text, record) => EXAM_TYPE_MAPPING[record.examData.type]
        }, {
            title: '操作',
            align: 'center',
            dataIndex: 'operation',
            render: (text, record) => (
                <div>
                    <Button title="编辑" onClick={() => this.onEdit(record)} type="primary" ghost><i className="far fa-edit"/></Button>
                    <Popconfirm title="你确认要删除吗？" okText="确认" cancelText="取消" onConfirm={() => this.onDelete(record)}>
                        <Button type="primary" ghost><i className="far fa-trash-alt"/></Button>
                    </Popconfirm>
                </div>
            )
        }];
    }

    onDelete = (record) => {
        const {actions: {deleteExam}, courseId, pointId} = this.props;
        deleteExam(courseId, pointId, record.examId)
            .then(() => message.success('删除成功！'))
            .catch(() => message.error('删除失败！'));
    }

    componentWillUpdate(nextProps) {
        if (nextProps.dataSource) {
            this.elements = rebuildDataWithKey(nextProps.dataSource);
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
                pagination={false}
            />
        );
    }
}

export default ExamTable;
