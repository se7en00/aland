import React, {Component, Fragment} from 'react';
import { Table, Button, message } from 'antd';
import PropTypes from 'prop-types';
import { rebuildDataWithKey, paginationSetting } from 'utils';
import Header from '../shared/panel/PanelHeader';
import { DATE_FORMAT } from 'constants';
class NoticeLikeList extends Component {
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
            title: '用户',
            align: 'center',
            dataIndex: 'userName'
        }, {
            title: '创建时间',
            align: 'center',
            dataIndex: 'createdAt',
            render: (text, record) => moment(record.createdAt).format(DATE_FORMAT)
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
        const { comments, actions: { getNoticeLike } } = this.props;
        if (/like/g.test(location.pathname)) {
            const id = location.pathname.match(/(\w)+(?=\/like)/g)[0];
            if (id) {
                this.id= id;
              //  getNoticeComments(id, {pageSize: paginationSetting.pageSize});
                getNoticeLike(id, {pageSize: paginationSetting.pageSize});
            }
        }
    }

    handelPageChange = (page, pageSize) => {
        const { actions: { getNoticeLike } } = this.props;
        getNoticeLike(this.id, Object.assign({pageSize, page}));
    };


    render() {
        return (
            <Fragment>
                <Header title='点赞名单'/>
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

export default NoticeLikeList;
