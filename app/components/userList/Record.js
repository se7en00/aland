import React, { Component } from 'react';
import { Table } from 'antd';
import { DATE_FORMAT } from 'constants';
class Record extends Component {

    // static propTypes = {
    //     // actions: PropTypes.objectOf(PropTypes.func),
    //     dataSource: PropTypes.object
    // };

    constructor(props) {
        super(props);
        this.elements = [];
        this.pagination = {
            onChange: this.handelPageChange
        };
        this.columns = [{
            title: '序号',
            align: 'center',
            dataIndex: 'index',
            width: 70
        }, {
            title: '培训名称',
            align: 'center',
            dataIndex: 'name'
        }, {
            title: '培训种类',
            align: 'center',
            dataIndex: 'type'
        }, {
            title: '培训讲师',
            align: 'center',
            dataIndex: 'teacher',

        }, {
            title: '培训时间',
            align: 'center',
            dataIndex: 'time',
            render: (text, record) => moment(record.time).format(DATE_FORMAT)
        }];
    }

    handelPageChange() {

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

export default Record;