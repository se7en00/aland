import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Button, message } from 'antd';
import { rebuildDataWithKey } from 'utils';
import { DATE_FORMAT, DIALOG } from 'constants';

class LessonsTable extends Component {
    constructor(props) {
        super(props);
        this.elements = rebuildDataWithKey(props.dataSource?.elements);

        this.columns = [{
            title: '序号',
            align: 'center',
            dataIndex: 'index',
            width: 70
        }, {
            title: '培训标题',
            align: 'center',
            dataIndex: 'title'
        }, {
            title: '培训讲师',
            align: 'center',
            dataIndex: 'lecturer'
        }, {
            title: '起止时间',
            align: 'center',
            dataIndex: 'enddate',
            render: (text, record) => {return moment(record.startDate).format(DATE_FORMAT)+'-'+moment(record.endDate).format(DATE_FORMAT)}
        }, {
            title: '培训地址',
            align: 'center',
            dataIndex: 'address'
        }, {
            title: '操作',
            align: 'center',
            dataIndex: 'operation',
            render: (text, record) => (
                <div>
                    <Button title="内容修改" onClick={() => this.onEditPoint(record)} type="primary" ghost><i className="far fa-edit"/></Button>
                    <Popconfirm title="你确认要删除吗？" okText="确认" cancelText="取消" onConfirm={() => this.onDelete(record)}>
                        <Button type="primary" ghost><i className="far fa-trash-alt"/></Button>
                    </Popconfirm>
                </div>
            )
        }];
    }

    componentWillUpdate(nextProps) {
        if (nextProps.dataSource) {
            this.elements = rebuildDataWithKey(nextProps.dataSource?.elements);
        }
    }

    onEditPoint = (record) => {
        const {showDialog, actions: {getTrainingLessonDetails}} = this.props;
        getTrainingLessonDetails(record.trainingId, record.id).then(() => {
            showDialog(DIALOG.TRAINING_LESSON_DETAILS)();
        });
    };

    onDelete = (record) => {
        const {actions: {deleteTrainingLesson}} = this.props;
        deleteTrainingLesson(record.trainingId, record.id)
            .then(() => {
                message.success(`删除课时：${record.title}成功！`);
            })
            .catch(() => {
                message.error(`删除课时：${record.title}失败！`);
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
                pagination={false}
            />
        );
    }
}

LessonsTable.propTypes = {
    showDialog: PropTypes.func,
    actions: PropTypes.objectOf(PropTypes.func),
    dataSource: PropTypes.object
};

export default LessonsTable;
