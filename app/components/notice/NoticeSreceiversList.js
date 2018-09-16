import React, {Component, Fragment} from 'react';
import { Table, Button, message } from 'antd';
import PropTypes from 'prop-types';
import { rebuildDataWithKey, paginationSetting } from 'utils';
import Header from '../shared/panel/PanelHeader';
import { DATE_FORMAT } from 'constants';
class NoticeSreceiversList extends Component {
    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func),
       
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
            title: '接收人',
            align: 'center',
            dataIndex: 'name'
        }, {
            title: '创建时间',
            align: 'center',
            dataIndex: 'createdAt',
            render: (text, record) => record.createdAt?moment(record.createdAt).format(DATE_FORMAT):'空'
        }];
    }

    componentWillUpdate(nextProps) {
        console.log(nextProps)
        if (nextProps.comments && Object.prototype.toString.call(nextProps.comments)  ===  "[object Array]" ) {
           // const { comments: {elements = [], paging = {}} } = nextProps;
           const { comments=[] } = nextProps;
            this.elements = rebuildDataWithKey(comments);
            console.log(this.elements);
          //  const { size: pageSize = 0, total = 0} = paging;
            this.pagination ={pageSize: paginationSetting.pageSize}
        }

        // if (nextProps.comments) {
        //     const { comments: {elements = [], paging = {}} } = nextProps;
        //     this.elements = rebuildDataWithKey(elements);
        //     const { size: pageSize = 0, total = 0} = paging;
        //     this.pagination = {...this.pagination, pageSize, total};
        // }

    }

    componentDidMount() {
        const { comments, actions: { getNoticeReceivers } } = this.props;
        if (/sreceivers/g.test(location.pathname)) {
            const id = location.pathname.match(/(\w)+(?=\/sreceivers)/g)[0];
            if (id) {
                this.id=id;
              //  getNoticeComments(id, {pageSize: paginationSetting.pageSize});
                getNoticeReceivers(id, {pageSize: paginationSetting.pageSize});
            }
        }
    }

    handelPageChange = (page, pageSize) => {
        const { actions: { getNoticeReceivers } } = this.props;
        getNoticeReceivers(this.id,Object.assign({pageSize, page}));
    };


    render() {
        console.log(this.props)
        return (
            <Fragment>
                <Header title='接收人'/>
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

export default NoticeSreceiversList;
