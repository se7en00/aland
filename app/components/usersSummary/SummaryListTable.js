import React, { Component } from 'react';
import { Table, Button } from 'antd';
import PropTypes from 'prop-types';
import { rebuildDataWithKey, paginationSetting } from 'utils';
import { BASE_URL, DATE_FORMAT, getLinkByName, PATHNAME } from 'constants';

class SummaryListTable extends Component {
    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func),
        dataSource: PropTypes.object,
        searchParams: PropTypes.object
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
            dataIndex: 'attachment',
            width: 200,
            render: (text, record) => {
                if (record.attachment) {
                    const domain = new URL(BASE_URL).origin;
                    const imgUrl = `${domain}/uploads${record.attachment}`;
                    return (
                        <div style={{maxWidth: '100px', margin: '0 auto'}}>
                            <img src={imgUrl} style={{ width: '100px', height: '100px' }} alt="img"/>
                        </div>
                    );
                }
            }
        }, {
            title: '学习任务',
            align: 'center',
            dataIndex: 'title'
        }, {
            title: '课程方向',
            align: 'center',
            dataIndex: 'direction1',
            render: (text, record) => {
                if (!record.direction1 && !record.direction2) return '';
                return `${record.direction1 || ''}/${record.direction2 || ''}`;
            }
        }, {
            title: '培训种类',
            align: 'center',
            dataIndex: 'trainType'
        }, {
            title: '负责人',
            align: 'center',
            dataIndex: 'manager'
        }, {
            title: '发布时间',
            align: 'center',
            dataIndex: 'createdAt',
            render: (text, record) => moment(record.createdAt).format(DATE_FORMAT)
        }, {
            title: '操作',
            align: 'center',
            dataIndex: 'operation',
            render: (text, record) => (
                <div>
                    <Button size="small" type="primary" onClick={() => this.redirect(record)} ghost>查看详情</Button>
                </div>
            )
        }];
    }

    redirect = (record) => {
        const {push} = this.props.actions;
        if (record.type === 'TASK') {
            push(`${getLinkByName(PATHNAME.LEARN_TASK)}/${record.id}/details`);
        } else {
            push(`${getLinkByName(PATHNAME.PUBLISHED_TRAINING)}/${record.id}/details`);
        }
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
        const { getSummaryList } = this.props.actions;
        const { searchParams } = this.props;
        getSummaryList(Object.assign({pageSize, page}, searchParams));
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

export default SummaryListTable;
