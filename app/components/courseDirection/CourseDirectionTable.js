import React, { Component } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import PropTypes from 'prop-types';
import { rebuildDataWithKey, paginationSetting } from 'utils';
import { DIALOG } from 'constants';

class CourseDirectionTable extends Component {
    static propTypes = {
        showDialog: PropTypes.func,
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
            title: '一级种类名称',
            align: 'center',
            dataIndex: 'direction'
        }, {
            title: '二级种类名称',
            align: 'center',
            dataIndex: 'description',
            render: (text, record) => {
                if (Object.hasOwnProperty.call(record, 'subDirections') && record.subDirections.length > 0) {
                    return record.subDirections.map(item => item.direction).join('、');
                }
                return '';
            }
        }, {
            title: '操作',
            align: 'center',
            dataIndex: 'operation',
            render: (text, record) => (
                <div>
                    <Button size="small" type="primary" onClick={() => this.openDialog(record)} ghost>编辑</Button>
                    {/*<Button size="small" type="primary" onClick={() => this.openDialog(record, DIALOG.PERMISSION)} ghost>导出名单</Button>*/}
                    <Popconfirm title="你确认要删除吗？" okText="确认" cancelText="取消" onConfirm={() => this.onDelete(record)}>
                        <Button size="small" type="primary" ghost>删除</Button>
                    </Popconfirm>
                </div>
            )
        }];
    }

    openDialog = (record) => {
        const {actions: {getCourseDirectionDetails}, showDialog} = this.props;
        getCourseDirectionDetails(record.id).then(() => showDialog(DIALOG.COURSE_EDIT_DIRECTION)());
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
        const { getCourseDirectionList } = this.props.actions;
        getCourseDirectionList({pageSize, page});
    }


    onDelete = (record) => {
        const {
            dataSource: {paging: {size, page}},
            actions: {deleteCourseDirection, getCourseDirectionList}
        } = this.props;
        deleteCourseDirection(record.id).then(() => {
            message.success(`成功删除：${record.direction}！`);
            getCourseDirectionList({pageSize: size, page, parentId: 0});
        }).catch(error => {
            message.error(`删除：${record.direction}失败！`);
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

export default CourseDirectionTable;
