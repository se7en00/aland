import React, { Component } from 'react';
import { Table, Button} from 'antd';
import PropTypes from 'prop-types';
import { rebuildDataWithKey } from 'utils';
import { DATE_FORMAT } from 'constants';

class TrainingUsers extends Component {
    static propTypes = {
        // actions: PropTypes.objectOf(PropTypes.func),
        dataSource: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.elements = [];
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
            dataIndex: 'gender'
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
            render: (text, record) => moment(record.workDate).format(DATE_FORMAT)
        }, {
            title: '操作',
            align: 'center',
            dataIndex: 'operation',
            render: (text, record) => (
                <div>
                    <Button size="small" type="primary" ghost>补签到</Button>
                </div>
            )
        }];
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
            />);
    }
}

export default TrainingUsers;
