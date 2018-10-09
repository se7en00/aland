import React, { Component } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import PropTypes from 'prop-types';
import { rebuildDataWithKey, paginationSetting } from 'utils';
import { DATE_FORMAT, PATHNAME, getLinkByName } from 'constants';

class InquiriesListTable extends Component {
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
            title: '问卷名称',
            align: 'center',
            dataIndex: 'name'
        }, {
            title: '类别',
            align: 'center',
            dataIndex: 'category'
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
                    {/* <Button size="small" type="primary" onClick={() => this.redirect(record.id)} ghost>详情/编辑</Button> */}
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
        const { getInquiryesList } = this.props.actions;
        getInquiryesList(pageSize, page);
        const { searchParams } = this.props;
        getInquiryesList(Object.assign({pageSize, page}, searchParams));
    }

    onDelete = (inquiry) => {
        const {
            dataSource: {paging: {size, page}},
            actions: {deleteInquiry, getInquiryesList}
        } = this.props;
        deleteInquiry(inquiry.id).then(() => {
            message.success(`成功删除问卷：${inquiry.name}！`);
            getInquiryesList(size, page);
        }).catch(error => {
            message.error(`删除问卷：${inquiry.name}失败！`);
        });
    }

    redirect = (id) => {
        const { push} = this.props.actions;
        push(`${getLinkByName(PATHNAME.QUESTIONNAIRE_BANK)}/${id}/detail`);
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

export default InquiriesListTable;
