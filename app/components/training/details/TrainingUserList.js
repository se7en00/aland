import React, { Component } from 'react';
import { Table, Button, message } from 'antd';
import PropTypes from 'prop-types';
import { rebuildDataWithKey } from 'utils';

class TrainingUserList extends Component {
    static propTypes = {
        trainings: PropTypes.object,
        actions: PropTypes.objectOf(PropTypes.func),
        dataSource: PropTypes.object
    };

    constructor(props) {
        super(props);
        console.log(this.props)
        const { dataSource: {elements = [], paging = {}} } = this.props;
      
        
        this.elements = rebuildDataWithKey(elements);
        const { size: pageSize = 0, total = 0} = paging;
        this.pagination = {...this.pagination, pageSize, total, onChange: this.handelPageChange};
       
        
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
            title: '分组',
            align: 'center',
            dataIndex: 'userLevel'
        }, {
            title: '状态',
            align: 'center',
            dataIndex: 'checkin',
            render: (text, record) => {
                if (record.checkin === '0') {
                    return '未签到';
                }
                return '已签到';
            }
        }, {
            title: '操作',
            align: 'center',
            dataIndex: 'operation',
            render: (text, record) => {
                if (record.status === 'UNHANDLE') {
                    return (
                        <div>
                            <Button size="small" type="primary" onClick={() => this.onCheckIn(record)} ghost>补签到</Button>
                        </div>
                    );
                }
            }
        }];
    }

    onCheckIn = (record) => {
        const {actions: {checkIn}, dataSource: {paging}} = this.props;
        const params = {
            userId: record.userId,
            trainingId: record.trainingData.id,
            ...paging
        };
        checkIn(params)
            .then(() => {
                message.success(`${record.userData.name}补签成功！`);
            })
            .catch(() => {
                message.error(`${record.userData.name}补签失败！`);
            });
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
        const { actions: {getUsers}, trainings } = this.props;
        const trainingId = trainings?.trainingDetails?.id;
        getUsers(Object.assign({trainingId, pageSize, page}));
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

export default TrainingUserList;
