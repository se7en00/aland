import React, { Component } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import PropTypes from 'prop-types';
import { rebuildDataWithKey, paginationSetting } from 'utils';
import { DATE_FORMAT, PATHNAME, getLinkByName } from 'constants';

class UserListTable extends Component {
    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func),
        dataSource: PropTypes.object,
        searchParams: PropTypes.object
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
            title: '姓名',
            align: 'center',
            dataIndex: 'name'
        }, {
            title: '性别',
            align: 'center',
            dataIndex: 'gender',
           render: (text, record) => this.parseGender(record.gender)
        }, {
            title: '手机号',
            align: 'center',
            dataIndex: 'phoneNumber'
        }, {
            title: '部门',
            align: 'center',
            dataIndex: 'deptName'
        }, {
            title: '岗位',
            align: 'center',
            dataIndex: 'post'
        }, {
            title: '工号',
            align: 'center',
            dataIndex: 'workNum'
        }, {
            title: '员工级别',
            align: 'center',
            dataIndex: 'userLevel'
        }, {
            title: '从岗时间',
            align: 'center',
            dataIndex: 'workDate',
            render: (text, record) => this.parseDate(record.workDate)
        }, {
            title: '操作',
            align: 'center',
            dataIndex: 'operation',
            render: (text, record) => (
                <div>
                    <Button size="small" type="primary" onClick={() => this.onEditPoint(record)} ghost>查看详情</Button>
                    {/*<Button size="small" type="primary" onClick={() => this.openDialog(record, DIALOG.PERMISSION)} ghost>导出培训数据</Button>*/}
                    <Popconfirm title="你确认要把密码重置成:123456 吗？" okText="确认" cancelText="取消" onConfirm={() => this.onResetPWD(record)}>
                        <Button size="small" type="primary" ghost>重置密码</Button>
                    </Popconfirm>
                    <Popconfirm title="你确认要删除吗？" okText="确认" cancelText="取消" onConfirm={() => this.onDelete(record)}>
                        <Button size="small" type="primary" ghost>删除</Button>
                    </Popconfirm>
                </div>
            )
        }];
    }
    parseGender(gender){
      return gender==1?'男':gender==0?'女':'无'
    }
    parseDate(date){
        return date == null? '无' :moment(date).format(DATE_FORMAT)
    }
    onResetPWD = (user) => {
        const {
            actions: {resetPassword}
        } = this.props;
        resetPassword(user.id).then(() => {
            message.success(`成功重置账户名：${user.name}的密码！`);
        }).catch(error => {
            message.error(`重置账户名：${user.name}的密码失败！`);
        });
    };

    onEditPoint = (record) => {
        const {actions: {push}} = this.props;
        push(`${getLinkByName(PATHNAME.USER_MANAGEMENT)}/${record.id}/details`);
    };

    componentWillUpdate(nextProps) {
        if (nextProps.dataSource) {
            const { dataSource: {elements = [], paging = {}} } = nextProps;
            this.elements = rebuildDataWithKey(elements);
            const { size: pageSize = 0, total = 0} = paging;
            this.pagination = {...this.pagination, pageSize, total};
        }
    }

    handelPageChange = (page, pageSize) => {
        const { getUserList } = this.props.actions;
        const { searchParams } = this.props;
        getUserList(Object.assign({pageSize, page}, searchParams));
    }

    onDelete = (user) => {
        const {
            dataSource: {paging: {size, page}},
            actions: {deleteUser, getUserList}
        } = this.props;
        deleteUser(user.id).then(() => {
            message.success(`成功删除人员：${user.name}！`);
            getUserList(size, page);
        }).catch(error => {
            message.error(`删除人员：${user.name}失败！`);
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

export default UserListTable;
