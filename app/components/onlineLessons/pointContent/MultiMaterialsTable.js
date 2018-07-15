import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Button, message } from 'antd';
import { rebuildDataWithKey } from 'utils';

class MultiMaterialsTable extends Component {
    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func),
        courseId: PropTypes.string,
        pointId: PropTypes.string,
        dataSource: PropTypes.array
    };

    constructor(props) {
        super(props);
        this.elements = rebuildDataWithKey(props.dataSource);

        this.columns = [{
            title: '素材名称',
            align: 'center',
            dataIndex: 'name'
        }, {
            title: '文件类型',
            align: 'center',
            dataIndex: 'fileType'
        }, {
            title: '操作',
            align: 'center',
            dataIndex: 'operation',
            render: (text, record) => (
                <div>
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

export default MultiMaterialsTable;
