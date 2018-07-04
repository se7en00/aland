import React, { Component } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import PropTypes from 'prop-types';
import { rebuildDataWithKey, paginationSetting } from 'utils';
import { DATE_FORMAT } from 'constants';

class MaterialsListTable extends Component {
    static propTypes = {
        // showDialog: PropTypes.func,
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
            title: '素材名称',
            align: 'center',
            dataIndex: 'name'
        }, {
            title: '类别',
            align: 'center',
            dataIndex: 'category'
        }, {
            title: '标签',
            align: 'center',
            dataIndex: 'productTags'
        }, {
            title: '格式',
            align: 'center',
            dataIndex: 'fileType'
        }, {
            title: '上传人',
            align: 'center',
            dataIndex: 'uploadUserName'
        }, {
            title: '创建时间',
            align: 'center',
            dataIndex: 'createdAt',
            render: (text, record) => moment(record.createdAt).format(DATE_FORMAT)
        }, {
            title: '操作',
            align: 'center',
            dataIndex: 'operation',
            render: (text, record) => (
                <div>
                    <Button size="small" type="primary" ghost>详情/编辑</Button>
                    <Popconfirm title="你确认要删除吗？" okText="确认" cancelText="取消" onConfirm={() => this.onDelete(record)}>
                        <Button size="small" type="primary" ghost>删除</Button>
                    </Popconfirm>
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
        const { getMaterialsList } = this.props.actions;
        getMaterialsList(pageSize, page);
        const { searchParams } = this.props;
        getMaterialsList(Object.assign({pageSize, page}, searchParams));
    }

    onDelete = (material) => {
        const {
            dataSource: {paging: {size, page}},
            actions: {deleteMaterial, getMaterialsList}
        } = this.props;
        deleteMaterial(material.id).then(() => {
            message.success(`成功删除素材：${material.name}！`);
            getMaterialsList(size, page);
        }).catch(error => {
            message.error(`删除素材：${material.name}失败！`);
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

export default MaterialsListTable;
