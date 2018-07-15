import React, { Component } from 'react';
import { rebuildDataWithKey } from 'utils';
import PropTypes from 'prop-types';
import { Table } from 'antd';

class MultipleMaterialTable extends Component {
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
            title: '序号',
            align: 'center',
            dataIndex: 'index',
            width: 60
        }, {
            title: '素材名称',
            align: 'center',
            dataIndex: 'name'
        }, {
            title: '类别',
            align: 'center',
            dataIndex: 'fileType'
        }, {
            title: '标签',
            align: 'center',
            dataIndex: 'point'
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

export default MultipleMaterialTable;
