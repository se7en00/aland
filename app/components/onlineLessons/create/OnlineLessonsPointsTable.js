import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Button, message } from 'antd';
import { rebuildDataWithKey } from 'utils';
import { getLinkByName, PATHNAME } from 'constants';
import { DIALOG } from 'constants';
class OnlineLessonsPointsTable extends Component {
    constructor(props) {
        super(props);
        this.elements = rebuildDataWithKey(props.dataSource);

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
                    <Button title="更改章节点" type="primary" ghost onClick={this.props.showDialog(DIALOG.EDITPOINT,record)}><i className="fas fa-retweet"/></Button>
                    <Button title="内容编辑" onClick={() => this.onEditPoint(record)} type="primary" ghost><i className="far fa-edit"/></Button>
                    <Popconfirm title="你确认要删除吗？" okText="确认" cancelText="取消" onConfirm={() => this.onDelete(record)}>
                        <Button type="primary" ghost><i className="far fa-trash-alt"/></Button>
                    </Popconfirm>
                </div>
            )
        }];
    }

    componentWillUpdate(nextProps) {
        console.log(nextProps)
        if (nextProps.dataSource) {
            this.elements = rebuildDataWithKey(nextProps.dataSource);
        }
    }
    onResetPoint =(point) =>{
        console.log(point)
        this.props.showDialog(DIALOG.EDITPOINT)
    } 
    onEditPoint = (point) => {
        const {lessonId, actions: {push}} = this.props;
        push(`${getLinkByName(PATHNAME.ONLINE_LESSONS)}/${lessonId}/details/point/${point.pointId}`);
    };

    onDelete = (record) => {
        const {lessonId, actions: {removePoint}} = this.props;
        removePoint(lessonId, record)
            .then(() => {
                message.success(`删除点：${record.point}成功！`);
            })
            .catch(() => {
                message.error(`删除点：${record.point}失败！`);
            });
    }

    render() {
        console.log(this.elements)
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
    lessonId: PropTypes.string,
    actions: PropTypes.objectOf(PropTypes.func),
    dataSource: PropTypes.array
};
OnlineLessonsPointsTable.defaultProps = {};

export default OnlineLessonsPointsTable;
