import React, { Component } from 'react';
import { rebuildDataWithKey, paginationSetting } from 'utils';
import PropTypes from 'prop-types';
import { Table } from 'antd';
// import { EXAM_TYPE_MAPPING, CATEGORY_TYPE_MAPPING } from 'constants';

class ExamDetailsDialogTable extends Component {
    static propTypes = {
        dataSource: PropTypes.object
    }

    constructor(props) {
        super(props);
        this.elements = [];
        this.pagination = {
            ...paginationSetting,
            onChange: this.handelPageChange
        };

        this.columns = [{
            title: '姓名',
            align: 'center',
            dataIndex: 'question'
        }, {
            title: '工号',
            align: 'center',
            dataIndex: 'type'
        }, {
            title: '正确答案',
            align: 'center',
            dataIndex: 'correct'
        }, {
            title: '实际答案',
            align: 'center',
            dataIndex: 'uncorrect'
        }, {
            title: '提交时间',
            align: 'center',
            dataIndex: 'date'
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
                pagination={false}
            />
        );
    }
}

export default ExamDetailsDialogTable;
