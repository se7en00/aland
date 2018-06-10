import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Popconfirm } from 'antd';
import uuid from 'uuid/v4';

class OnlineLessonsPointsTable extends Component {
    constructor(props) {
        super(props);
        this.elements = this.buildTableElements(props.dataSource);

        this.columns = [{
            title: '序号',
            align: 'center',
            dataIndex: 'index',
            width: 70
        }, {
            title: '章',
            align: 'center',
            dataIndex: 'chapter'
        }, {
            title: '节',
            align: 'center',
            dataIndex: 'section'
        }, {
            title: '点',
            align: 'center',
            dataIndex: 'point'
        }, {
            title: '内容编辑',
            align: 'center',
            dataIndex: 'operation',
            render: (text, record) => (
                <div>
                    <Button size="small" type="primary" ghost>详情/编辑</Button>
                    <Button size="small" type="primary" ghost>审核</Button>
                    <Popconfirm title="你确认要删除吗？" okText="确认" cancelText="取消" onConfirm={() => this.onDelete(record)}>
                        <Button size="small" type="primary" ghost>删除</Button>
                    </Popconfirm>
                </div>
            )
        }, {
            title: '内容编辑',
            align: 'center',
            dataIndex: 'operation',
            render: (text, record) => (
                <Popconfirm title="你确认要删除吗？" okText="确认" cancelText="取消" onConfirm={() => this.onDelete(record)}>
                    <Button size="small" type="primary" ghost>删除</Button>
                </Popconfirm>
            )
        }];
    }

    buildTableElements = (dataSource) => {
        const { chapter, section, points, lessonId } = dataSource;
        return points.map((item, index) => ({
            index: index + 1,
            key: uuid(),
            lessonId,
            chapter,
            section,
            point: item
        }));
    }

    componentWillUpdate(nextProps) {
        if (nextProps.dataSource) {
            this.elements = this.buildTableElements(nextProps.dataSource);
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

OnlineLessonsPointsTable.propTypes = {
    // showDialog: PropTypes.func,
    // actions: PropTypes.objectOf(PropTypes.func),
    dataSource: PropTypes.object
};
OnlineLessonsPointsTable.defaultProps = {};

export default OnlineLessonsPointsTable;
