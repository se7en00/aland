import React, { Component } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import PropTypes from 'prop-types';
import { rebuildDataWithKey, paginationSetting } from 'utils';
import { DIALOG } from 'constants';

class UserGroupListTable extends Component {
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
            title: '标题',
            align: 'center',
            dataIndex: 'title'
        }, {
            title: '描述',
            align: 'center',
            dataIndex: 'description'
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

    openDialog = (userGroup) => {
        const {actions: {getUserGroupDetails}, showDialog} = this.props;
        getUserGroupDetails(userGroup.id).then(() => showDialog(DIALOG.EDIT_USER_GROUP)());
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
        const { getUserGroupList } = this.props.actions;
        getUserGroupList({pageSize, page});
    }


    onDelete = (userGroup) => {
        const {
            dataSource: {paging: {size, page}},
            actions: {deleteUserGroup, getUserGroupList}
        } = this.props;
        deleteUserGroup(userGroup.id).then(() => {
            message.success(`成功删除群组：${userGroup.title}！`);
            getUserGroupList({pageSize: size, page});
        }).catch(error => {
            message.error(`删除群组：${userGroup.title}失败！`);
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

export default UserGroupListTable;
