import React, { Component } from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import { rebuildDataWithKey } from 'utils';

class OnlineLessonTable extends Component {
    static propTypes = {
        onChange: PropTypes.func,
        actions: PropTypes.objectOf(PropTypes.func),
        dataSource: PropTypes.object,
        searchParams: PropTypes.object,
        selectedKeys: PropTypes.string
    };

    constructor(props) {
        super(props);
        const { dataSource: {elements = [], paging = {}} } = this.props;
        this.elements = rebuildDataWithKey(elements);

        const { size: pageSize = 0, total = 0} = paging;
        this.pagination = {...this.pagination, pageSize, total, onChange: this.handelPageChange};

        this.rowSelection = {
            columnWidth: 30,
            onChange: props.onChange
        };
        this.columns = [{
            title: '序号',
            align: 'center',
            dataIndex: 'index',
            width: 60
        }, {
            title: '名称',
            align: 'center',
            dataIndex: 'name'
        }, {
            title: '类别',
            align: 'center',
            dataIndex: 'category'
        }, {
            title: '标签',
            align: 'center',
            dataIndex: 'point'
        }];
    }


    componentWillUpdate(nextProps) {
        if (nextProps.selectedKeys) {
            this.rowSelection.selectedRowKeys = nextProps.selectedKeys;
        }
        if (nextProps.dataSource) {
            const { dataSource: {elements = [], paging = {}} } = nextProps;
            this.elements = rebuildDataWithKey(elements);
            const { size: pageSize = 0, total = 0} = paging;
            this.pagination = {...this.pagination, pageSize, total};
        }
    }

    handelPageChange = (page, pageSize) => {
        const { searchOnlineLessons } = this.props.actions;
        const { searchParams } = this.props;
        searchOnlineLessons(Object.assign({pageSize, page}, searchParams));
    }

    render() {
        return (
            <Table
                className="u-pull-down-sm"
                bordered
                rowSelection={this.rowSelection}
                size="middle"
                dataSource={this.elements}
                columns={this.columns}
                pagination={this.pagination}
            />);
    }
}

export default OnlineLessonTable;
