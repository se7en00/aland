import React, { Component } from 'react';
import { rebuildDataWithKey } from 'utils';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { EXAM_TYPE_MAPPING, CATEGORY_TYPE_MAPPING } from 'constants';

class ExamDialogTable extends Component {
    static propTypes = {
        onChange: PropTypes.func,
        dataSource: PropTypes.array,
        selectedKeys: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.elements = rebuildDataWithKey(props.dataSource);
        this.rowSelection = {
            columnWidth: 30,
            onChange: props.onChange
        };

        this.columns = [{
            title: '试题题目',
            align: 'center',
            dataIndex: 'question'
        }, {
            title: '题型',
            align: 'center',
            dataIndex: 'type',
            render: (text, record) => EXAM_TYPE_MAPPING[record.type]
        }, {
            title: '种类',
            align: 'center',
            dataIndex: 'categoryCode',
            render: (text, record) => CATEGORY_TYPE_MAPPING[record.categoryCode]
        }];
    }

    componentWillUpdate(nextProps) {
        if (nextProps.selectedKeys) {
            this.rowSelection.selectedRowKeys = [nextProps.selectedKeys];
        }
        if (nextProps.dataSource) {
            this.elements = rebuildDataWithKey(nextProps.dataSource);
        }
    }

    render() {
        return (
            <Table
                className="u-pull-down-sm col-md-12 col-lg-12"
                bordered
                size="small"
                rowSelection={this.rowSelection}
                dataSource={this.elements}
                columns={this.columns}
                pagination={false}
            />
        );
    }
}

export default ExamDialogTable;
