import React, { Component } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import PropTypes from 'prop-types';
import { rebuildDataWithKey, paginationSetting } from 'utils';
import { DATE_FORMAT, PATHNAME, getLinkByName, BASE_URL } from 'constants';

class NoticesListTable extends Component {
    static propTypes = {
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
            title: '图片',
            align: 'center',
            dataIndex: 'coverImgPath',
            width: 200,
            render: (text, record) => {
                const domain = new URL(BASE_URL).origin;
                const imgUrl = `${domain}/uploads${record.coverImgPath}`;
                return (
                    <div style={{maxWidth: '100px', margin: '0 auto'}}>
                        <img src={imgUrl} style={{ width: '100%', height: '100%' }} alt="img"/>
                    </div>
                );
            }
        }, {
            title: '标题',
            align: 'center',
            dataIndex: 'title'
        }, {
            title: '状态',
            align: 'center',
            dataIndex: 'status',
            render: (text, record) => {
                switch (record.status) {
                case 1:
                    return '在用';
                case 0:
                    return '停用';
                case -1:
                    return '删除';
                default:
                    return '';
                }
            }
        }, {
            title: '发布部门',
            align: 'center',
            dataIndex: 'publishDeptName'
        }, {
            title: '发布人',
            align: 'center',
            dataIndex: 'publishUserName'
        }, {
            title: '发布时间',
            align: 'center',
            dataIndex: 'publishAt',
            render: (text, record) => moment(record.publishAt).format(DATE_FORMAT)
        }, {
            title: '操作',
            align: 'center',
            dataIndex: 'operation',
            render: (text, record) => (
                <div>
                    <Button size="small" type="primary" onClick={() => this.redirect(record.id)} ghost>详情</Button>
                    <Popconfirm title={`你确认要${record.status ? '撤回' : '启用'}吗？`} okText="确认" cancelText="取消" onConfirm={() => this.toggleStatus(record.id, record.status)}>
                        <Button size="small" type="primary" ghost>{record.status ? '撤回' : '启用'}</Button>
                    </Popconfirm>
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
        const { actions: { getNoticesList }, searchParams } = this.props;
        getNoticesList(Object.assign({pageSize, page}, searchParams));
    };

    onDelete = (notice) => {
        const {
            dataSource: {paging: {size, page}},
            actions: {deleteNotice, getNoticesList}
        } = this.props;
        deleteNotice(notice.id).then(() => {
            message.success('删除成功!');
            getNoticesList(size, page);
        }).catch(error => {
            message.error('删除失败!');
        });
    }

    redirect = (id) => {
        const { push} = this.props.actions;
        push(`${getLinkByName(PATHNAME.NOTES_MANAGEMENT)}/${id}/detail`);
    }

    toggleStatus = (id, status) => {
        const { dataSource: {paging: {size, page}}, actions: { toggleStatus, getNoticesList } } = this.props;
        const newStatus = status ? 'disable' : 'enable';
        toggleStatus(id, newStatus).then(() => {
            message.success('操作成功！');
            getNoticesList(size, page);
        }).catch(() => {
            message.success('操作失败！');
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

export default NoticesListTable;
