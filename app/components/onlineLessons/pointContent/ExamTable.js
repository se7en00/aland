import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Button, message } from 'antd';
import { rebuildDataWithKey } from 'utils';
import { DIALOG, TYPE_MAPPING } from 'constants';

class ExamTable extends Component {
    static propTypes = {
        showDialog: PropTypes.func,
        actions: PropTypes.objectOf(PropTypes.func),
        courseId: PropTypes.string,
        dataSource: PropTypes.array
    };

    constructor(props) {
        super(props);
        this.elements = rebuildDataWithKey(props.dataSource);

        this.columns = [{
            title: '描述',
            align: 'center',
            dataIndex: 'content1'
        }, {
            title: '作业类型',
            align: 'center',
            dataIndex: 'type',
            render: (text, record) => TYPE_MAPPING[record.type]
        }, {
            title: '操作',
            align: 'center',
            dataIndex: 'operation',
            render: (text, record) => (
                <div>
                    <Button title="内容编辑" onClick={() => this.onEdit(record)} type="primary" ghost><i className="far fa-edit"/></Button>
                    <Popconfirm title="你确认要删除吗？" okText="确认" cancelText="取消" onConfirm={() => this.onDelete(record)}>
                        <Button type="primary" ghost><i className="far fa-trash-alt"/></Button>
                    </Popconfirm>
                </div>
            )
        }];
    }

    onEdit = (record) => {
        const {actions: {editHomeWork}, showDialog, courseId} = this.props;
        let dialog;
        if (record.type === 'INTERACTION') {
            const {courseContentId, id } = record;
            dialog = DIALOG.INTERACTION_WORK;
            editHomeWork(record.type, {courseId, pointId: courseContentId, homeWorkId: id});
        } else {
            dialog = DIALOG.HOME_WORK;
            editHomeWork(record.type, {content1: record.content1, id: record.id});
        }
        showDialog(dialog, TYPE_MAPPING[record.type])();
    }

    onDelete = (record) => {
        const {actions: {deleteHomeWork}, courseId} = this.props;
        deleteHomeWork(courseId, record.courseContentId, record.id)
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
