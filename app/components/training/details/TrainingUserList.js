import React, { Component } from 'react';
import { Table, Button, message, Input } from 'antd';
import PropTypes from 'prop-types';
import {DIALOG, BASE_URL } from 'constants';
import extendStyle from 'layout/main/extend.scss';
import { rebuildDataWithKey } from 'utils';
import { Axios, paginationSetting } from 'utils/index';
class TrainingUserList extends Component {
    static propTypes = {
        trainings: PropTypes.object,
        actions: PropTypes.objectOf(PropTypes.func),
        dataSource: PropTypes.object
    };

    constructor(props) {
        super(props);
        console.log(this.props)
        const { dataSource: { elements = [], paging = {} } } = this.props;
        this.printWord = this.printWord.bind(this);

        this.elements = rebuildDataWithKey(elements);
        const { size: pageSize = 0, total = 0 } = paging;
        this.pagination = { ...this.pagination, pageSize, total, onChange: this.handelPageChange };


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
            dataIndex: 'groupId'
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
                let statusBtn, contractBtn,certificateBtn

                if (record.status === 'UNHANDLE') {
                    statusBtn = (

                        <Button size="small" type="primary" onClick={() => this.onCheckIn(record)} ghost>补签到</Button>

                    );
                }
                if (!record.contractUrl) {
                    contractBtn = (
                        <span className={extendStyle.fileinput}>
                            <span>协议上传</span>
                            <Input type="file" onChange={this.update} onClick={() => this.onCheckFile(record)}></Input>
                        </span>
                    )
                }
                if(record.certificateUrl){
                    certificateBtn = (
                        <Button size="small" type="primary"><a href={record.certificateUrl} target="_blank">查看证书</a></Button>
                    )
                }
                if (record.contractUrl) {
                    contractBtn = (
                        <Button size="small" type="primary"><a href={record.contractUrl} target="_blank">查看协议</a></Button>
                    )
                    }
                return (
                    <div>
                        {statusBtn}{contractBtn}
                    </div>
                )
            }
        }];
    }
    onCheckFile(record) {
        this._record = record;

    }
    update = (e) => {

        const { actions: { uploadFileTrue }, dataSource: { paging } } = this.props;
        let file = e.target.files[0];
        let param = new FormData();
        param.append('file', file);
        console.log(param.get('file'));
        let config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        }; //添加请求头
        Axios.post(`${BASE_URL}/api/uploads`, param, config)

            .then(response => {
                console.log(response.data.locations[0])
                const params = {
                    userId: this._record.userId,
                    trainingId: this._record.trainingId,
                    contractUrl: response.data.locations[0],
                    ...paging
                }
                console.log(paging)
                //console.log(response.data);
                uploadFileTrue(params).then(() => {
                    message.success(`上传成功！`);
                }).catch(() => {
                    message.success(`上传失败！`);
                })
            })

    }
    showContract(record) {
        window.open=record.contractUrl;
    }
    onCheckIn = (record) => {
        const { actions: { checkIn }, dataSource: { paging } } = this.props;
        const params = {
            userId: record.userId,
            trainingId: record.trainingId,
            ...paging
        };
        checkIn(params)
            .then(() => {
                message.success(`补签成功！`);
            })
            .catch(() => {
                message.error(`补签失败！`);
            });
    }

    componentWillUpdate(nextProps) {
        if (nextProps.dataSource) {
            const { dataSource: { elements = [], paging = {} } } = nextProps;
            this.elements = rebuildDataWithKey(elements);
            const { size: pageSize = 0, total = 0 } = paging;
            this.pagination = { ...this.pagination, pageSize, total };
        }
    }

    parseName(elements) {
        let str = '', i = 0;
        elements.forEach(item => {
            if (i == 0) {
                str += `?name=${item.name}`
            } else {
                str += `&name=${item.name}`
            }
            i++;
        })
        return str;
    }
    handelPageChange = (page, pageSize) => {
        const { actions: { getUsers }, trainings } = this.props;
        const trainingId = trainings ?.trainingDetails ?.id;
        getUsers(Object.assign({ trainingId, pageSize, page }));
    }
    printWord() {
        const { dataSource: { elements = [], paging = {} } } = this.props;
        // console.log( `${BASE_URL}/api/printSeat${this.parseName(elements)}`)
        location.href = `${BASE_URL}/api/printSeat${this.parseName(elements)}`;// eslint-disable-line
    }
    groupaction(){
        const {showDialog} = this.props;
        showDialog(DIALOG.GROUP_ACTION)();
    }
    render() {
        console.log(this.elements)
        return (
            <div>
                <Button onClick={()=>this.groupaction(this.elements)}>分组</Button>
                <Button onClick={this.printWord}>打印席卡</Button>
                <Table
                    className="u-pull-down-sm"
                    bordered
                    size="middle"
                    dataSource={this.elements}
                    columns={this.columns}
                    pagination={this.pagination}
                />
            </div>
        );
    }
}

export default TrainingUserList;
