import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, message, Popconfirm } from 'antd';
import { rebuildDataWithKey } from 'utils/index';
import { BASE_URL} from 'constants';

class TaskLessTable extends Component {
    constructor(props) {
        super(props);
        this.elements = rebuildDataWithKey(props.dataSource);

        this.columns = [{
            title: '序号',
            align: 'center',
            dataIndex: 'index',
            width: 70
        }, {
            title: '封面',
            align: 'center',
            dataIndex: 'cover',
            width: 200,
            render: (text, record) => {
                if (record.cover) {
                    const domain = new URL(BASE_URL).origin;
                    const imgUrl = `${domain}/uploads${record.cover}`;
                    return (
                        <div style={{maxWidth: '100px', margin: '0 auto'}}>
                            <img src={imgUrl} style={{ width: '100px', height: '100px' }} alt="img"/>
                        </div>
                    );
                }
            }
        }, {
            title: '名称',
            align: 'center',
            dataIndex: 'name'
        }, {
            title: '课件类型',
            align: 'center',
            dataIndex: 'lecturer',
            render: (text, record) => (record.name ? '在线课程' : '一点通')
        }, {
            title: '操作',
            align: 'center',
            dataIndex: 'operation',
            render: (text, record) => (
                <div>
                    <Popconfirm title="你确认要删除吗？" okText="确认" cancelText="取消" onConfirm={() => this.onDelete(record)}>
                        <Button size="small" type="primary" ghost>删除</Button>
                    </Popconfirm>
                </div>
            )
        }];
    }

    componentWillUpdate(nextProps) {
        if (nextProps.dataSource) {
            this.elements = rebuildDataWithKey(nextProps.dataSource);
        }
    }

    onDelete = (record) => {
        const {dataSource, taskId} = this.props;
        const restLessons = dataSource
            .filter(lesson => lesson.id !== record.id)
            .map(lesson => ({lessionId: lesson.id, type: lesson.name ? 'COURSE' : 'PEDIA'}));

        const {actions: {saveTaskLessons}} = this.props;
        saveTaskLessons(taskId, restLessons)
            .then(() => {
                message.success(`删除课时：${record.name || record.subject}成功！`);
            })
            .catch(() => {
                message.error(`删除课时：${record.name || record.subject}失败！`);
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

TaskLessTable.propTypes = {
    // showDialog: PropTypes.func,
    actions: PropTypes.objectOf(PropTypes.func),
    dataSource: PropTypes.array,
    taskId: PropTypes.string
};

export default TaskLessTable;
