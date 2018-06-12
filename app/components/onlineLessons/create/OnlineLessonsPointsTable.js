import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Button, message } from 'antd';
import uuid from 'uuid/v4';
import { getLinkByName, PATHNAME } from 'constants';

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
            title: '操作',
            align: 'center',
            dataIndex: 'operation',
            render: (text, record) => (
                <div>
                    <Button title="更改章节点" type="primary" ghost><i className="fas fa-retweet"/></Button>
                    <Button title="内容编辑" onClick={() => this.onEditPoint(record)} type="primary" ghost><i className="far fa-edit"/></Button>
                    <Popconfirm title="你确认要删除吗？" okText="确认" cancelText="取消" onConfirm={() => this.onDelete(record)}>
                        <Button type="primary" ghost><i className="far fa-trash-alt"/></Button>
                    </Popconfirm>
                </div>
            )
        }];
    }

    buildTableElements = (dataSource) => {
        if (!dataSource) return;
        const { chapter, section, points, lessonId } = dataSource;
        const {id: chapterId, subject: chapterName } = chapter;
        const {id: sectionId, subject: sectionName } = section;
        return points.map((item, index) => ({
            index: index + 1,
            key: uuid(),
            lessonId,
            pointId: item.id,
            chapterId,
            sectionId,
            chapter: chapterName,
            section: sectionName,
            point: item.subject
        }));
    }

    componentWillUpdate(nextProps) {
        if (nextProps.dataSource) {
            this.elements = this.buildTableElements(nextProps.dataSource);
        }
    }

    onEditPoint = (point) => {
        this.props.actions.push(`${getLinkByName(PATHNAME.ONLINE_LESSONS)}/addition/point/${point.lessonId}`);
    };

    onDelete = (record) => {
        this.props.actions.removePoint(record)
            .then(() => {
                console.log('222');
            })
            .catch(error => {
                message.error(`删除点：${record.point}失败！`);
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

OnlineLessonsPointsTable.propTypes = {
    // showDialog: PropTypes.func,
    actions: PropTypes.objectOf(PropTypes.func),
    dataSource: PropTypes.object
};
OnlineLessonsPointsTable.defaultProps = {};

export default OnlineLessonsPointsTable;
