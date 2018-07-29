import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Button, message } from 'antd';
import { rebuildDataWithKey } from 'utils';
import { EXAM_TYPE_MAPPING, EXAM_SOURCE_MAPPING, EXAM_STATUS_MAPPING, DIALOG } from 'constants';

class TrainingQuizzesTable extends Component {
    static propTypes = {
        showDialog: PropTypes.func,
        actions: PropTypes.objectOf(PropTypes.func),
        traniningId: PropTypes.string,
        dataSource: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.elements = rebuildDataWithKey(props.dataSource?.elements);

        this.columns = [{
            title: '题目',
            align: 'center',
            dataIndex: 'examData.question'
        }, {
            title: '来源',
            align: 'center',
            dataIndex: 'source',
            render: (text, record) => EXAM_SOURCE_MAPPING[record.examData.source]
        }, {
            title: '类型',
            align: 'center',
            dataIndex: 'examData.type',
            render: (text, record) => EXAM_TYPE_MAPPING[record.examData.type]
        }, {
            title: '状态',
            align: 'center',
            dataIndex: 'examData.status',
            render: (text, record) => EXAM_STATUS_MAPPING[record.status]
        }, {
            title: '操作',
            align: 'center',
            dataIndex: 'operation',
            render: (text, record) => (
                <div>
                    {record.status === 'PAUSE' && <Button title="开启" onClick={() => this.onStart(record)} icon="play-circle" type="primary" ghost/>}
                    {record.status === 'START' && <Button title="暂停" onClick={() => this.onPause(record)} icon="pause-circle-o" type="primary" ghost/>}
                    <Button title="详情" onClick={() => this.openExamDetails(record)} icon="bars" type="primary" ghost/>
                    <Popconfirm title="你确认要删除吗？" okText="确认" cancelText="取消" onConfirm={() => this.onDelete(record)}>
                        <Button type="primary" ghost><i className="far fa-trash-alt"/></Button>
                    </Popconfirm>
                </div>
            )
        }];
    }

    openExamDetails = (record) => {
        const {actions: {getExamDetails, getExamUserList}, showDialog, traniningId} = this.props;
        getExamDetails(record.examId)
            .then(() => getExamUserList(traniningId, record.examId))
            .then(() => showDialog(DIALOG.TRAINING_EXAM_DETAILS)());
    };

    onStart = (record) => {
        const {actions: {startExam}, traniningId} = this.props;
        startExam(traniningId, record.examId);
    }

    onPause = (record) => {
        const {actions: {pauseExam}, traniningId} = this.props;
        pauseExam(traniningId, record.examId);
    }

    onDelete = (record) => {
        const {actions: {deleteExam}, traniningId} = this.props;
        deleteExam(traniningId, record.examId)
            .then(() => message.success('删除成功！'))
            .catch(() => message.error('删除失败！'));
    }

    componentWillUpdate(nextProps) {
        if (nextProps.dataSource) {
            this.elements = rebuildDataWithKey(nextProps.dataSource?.elements);
        }
    }

    render() {
        return (
            <Table
                className="u-pull-down-sm offset-md-2 offset-lg-1"
                bordered
                size="middle"
                dataSource={this.elements}
                columns={this.columns}
                pagination={false}
            />
        );
    }
}

export default TrainingQuizzesTable;
