import React, { Component } from 'react';
import { rebuildDataWithKey, paginationSetting } from 'utils';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { DATE_FORMAT } from 'constants';
// import { EXAM_TYPE_MAPPING, CATEGORY_TYPE_MAPPING } from 'constants';

class ExamDetailsDialogTable extends Component {
    static propTypes = {
        dataSource: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.elements = rebuildDataWithKey(this.props.dataSource.elements);
        this.pagination = {
            ...paginationSetting,
            onChange: this.handelPageChange
        };

        this.columns = [{
            title: '姓名',
            align: 'center',
            dataIndex: 'user.name'
        }, {
            title: '工号',
            align: 'center',
            dataIndex: 'user.workNum'
        }, {
            title: '正确答案',
            align: 'center',
            dataIndex: 'examData.answer',
            render: (text, record) => {
                if (!record.examData?.answer) {
                    return '';
                }
                return record.examData.answer;
            }
        }, {
            title: '实际答案',
            align: 'center',
            dataIndex: 'answer'
        }, {
            title: '提交时间',
            align: 'center',
            dataIndex: 'user.createdAt',
            render: (text, record) => moment(record.user.createdAt).format(DATE_FORMAT)
        }];
    }

    componentWillUpdate(nextProps) {
        if (nextProps.dataSource) {
            const { dataSource: {elements = [], paging = {}} } = nextProps;
            this.elements = rebuildDataWithKey(elements);
            const { size: pageSize = 0, total = 0 } = paging;
            this.pagination = {...this.pagination, pageSize, total};
        }
    }

    render() {
        return (
            <Table
                className="u-pull-down-sm col-md-12 col-lg-12"
                bordered
                size="middle"
                dataSource={this.elements}
                columns={this.columns}
                pagination={this.pagination}
            />
        );
    }
}

export default ExamDetailsDialogTable;
