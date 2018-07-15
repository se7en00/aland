import React, {Component, Fragment} from 'react';
import { Table, Button } from 'antd';
import PropTypes from 'prop-types';
import { rebuildDataWithKey, paginationSetting } from 'utils';

class NoticeCommentsList extends Component {
    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func),
        comments: PropTypes.object,
        toggleStatus: PropTypes.func
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
            dataIndex: 'userName'
        }, {
            title: '评论内容',
            align: 'center',
            dataIndex: 'comments'
        }, {
            title: '操作',
            align: 'center',
            dataIndex: 'status',
            render: (text, record) => (
                <div>
                    <Button size="small" type="primary" onClick={() => props.toggleStatus(record.id, record.status)} ghost>{record.status ? '关闭' : '公开'}</Button>
                </div>
            )
        }];
    }

    componentWillUpdate(nextProps) {
        if (nextProps.comments) {
            const { comments: {elements = [], paging = {}} } = nextProps;
            this.elements = rebuildDataWithKey(elements);
            const { size: pageSize = 0, total = 0} = paging;
            this.pagination = {...this.pagination, pageSize, total};
        }
    }

    handelPageChange = (page, pageSize) => {
        const { actions: { getNoticesList } } = this.props;
        getNoticesList(Object.assign({pageSize, page}));
    };

    render() {
        return (
            <Fragment>
                <Table
                    className="u-pull-down-sm"
                    bordered
                    size="middle"
                    dataSource={this.elements}
                    columns={this.columns}
                    pagination={this.pagination}
                />
            </Fragment>
        );
    }
}

export default NoticeCommentsList;
