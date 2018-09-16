import React, {Component, Fragment} from 'react';
import { Table, Button, message } from 'antd';
import PropTypes from 'prop-types';
import { rebuildDataWithKey, paginationSetting } from 'utils';
import { PANEL_TITLE } from 'constants';
import Header from '../shared/panel/PanelHeader';

class NoticeCommentsList extends Component {
    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func),
        comments: PropTypes.object
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
                    <Button size="small" type="primary" onClick={() => this.toggleStatus(record.id, record.status)} ghost>{record.status ? '关闭' : '公开'}</Button>
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

    componentDidMount() {
        const { comments, actions: { getNoticeComments } } = this.props;
        if (/comments/g.test(location.pathname)) {
            const id = location.pathname.match(/(\w)+(?=\/comments)/g)[0];
            if (id) {
                getNoticeComments(id, {pageSize: paginationSetting.pageSize});
            }
        }
    }

    handelPageChange = (page, pageSize) => {
        const { actions: { getNoticesList } } = this.props;
        getNoticesList(Object.assign({pageSize, page}));
    };

    toggleStatus = (commentId, status) => {
        const { comments: {paging: {size, page} }, actions: { toggleCommentStatus, getNoticeComments } } = this.props;
        const id = location.pathname.match(/(\w)+(?=\/comments)/g)[0];
        const newStatus = status ? 'disable' : 'enable';
        toggleCommentStatus(id, commentId, newStatus).then(() => {
            message.success('操作成功！');
            getNoticeComments(id, {size, page});
        }).catch(() => {
            message.success('操作失败！');
        });
    };
    render() {
        return (
            <Fragment>
                <Header title={PANEL_TITLE.NOTES_COMMENTS}/>
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
