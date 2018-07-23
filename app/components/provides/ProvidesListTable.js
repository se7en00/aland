import React, { Component } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import PropTypes from 'prop-types';
import { rebuildDataWithKey, paginationSetting } from 'utils';

class ProvidesListTable extends Component {
    static propTypes = {
        editProvide: PropTypes.func,
        searchParams: PropTypes.object,
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
            title: '供应商名称',
            align: 'center',
            dataIndex: 'name'
        }, {
            title: '负责人',
            align: 'center',
            dataIndex: 'manager'
        }, {
            title: '联系方式',
            align: 'center',
            dataIndex: 'tel'
        }, /*{
            title: '后台打分',
            align: 'center',
            dataIndex: 'fileType'
        }, {
            title: '学员打分',
            align: 'center',
            dataIndex: 'uploadUserName'
        }, */{
            title: '操作',
            align: 'center',
            dataIndex: 'operation',
            render: (text, record) => (
                <div>
                    <Button onClick={() => props.editProvide(record)} size="small" type="primary" ghost>编辑</Button>
                    <Popconfirm title="你确认要删除吗？" okText="确认" cancelText="取消" onConfirm={() => this.onDelete(record)}>
                        <Button size="small" type="primary" ghost>删除</Button>
                    </Popconfirm>
                    {/*<Button onClick={() => props.editProvide(record, 'rating')} size="small" type="primary" ghost>打分</Button>*/}
                    {/*<Button size="small" type="primary" ghost>学员打分详情</Button>*/}
                </div>
            )
        }];
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
        const { getProvidesList } = this.props.actions;
        getProvidesList(pageSize, page);
        const { searchParams } = this.props;
        getProvidesList(Object.assign({pageSize, page}, searchParams));
    }

    onDelete = (provide) => {
        const {
            dataSource: {paging: {size, page}},
            actions: {deleteProvide, getProvidesList}
        } = this.props;
        deleteProvide(provide.id).then(() => {
            message.success(`成功删除供应商：${provide.name}！`);
            getProvidesList(size, page);
        }).catch(error => {
            message.error(`删除供应商：${provide.name}失败！`);
        });
    };


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

export default ProvidesListTable;
