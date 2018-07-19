import React, { Component } from 'react';
import { Table, Button } from 'antd';
import PropTypes from 'prop-types';
import { rebuildDataWithKey } from 'utils';
import { DIALOG } from 'constants';

class OrgListTable extends Component {
    static propTypes = {
        showDialog: PropTypes.func,
        actions: PropTypes.objectOf(PropTypes.func),
        dataSource: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.elements = [];
        this.columns = [{
            title: '组织架构树',
            align: 'center',
            dataIndex: 'name'
        }, {
            title: '部门级别',
            align: 'center',
            dataIndex: 'level'
        }, {
            title: '上级部门',
            align: 'center',
            dataIndex: 'parentName'
        }, {
            title: '成本中心',
            align: 'center',
            dataIndex: 'costCenterName'
        }, {
            title: '通用审核员',
            align: 'center',
            dataIndex: 'commonPost',
            render: (text, record) => (
                <div>
                    <Button size="small" type="primary" onClick={() => this.openDialog(record.id, 'COMMON_POST')} ghost>编辑</Button>
                </div>
            )
        }, {
            title: '设备审核员',
            align: 'center',
            dataIndex: 'equipPost',
            render: (text, record) => (
                <div>
                    <Button size="small" type="primary" onClick={() => this.openDialog(record.id, 'EQUIP_POST')} ghost>编辑</Button>
                </div>
            )
        }, {
            title: '质量审核员',
            align: 'center',
            dataIndex: 'qualityPost',
            render: (text, record) => (
                <div>
                    <Button size="small" type="primary" onClick={() => this.openDialog(record.id, 'QUALITY_POST')} ghost>编辑</Button>
                </div>
            )
        }, {
            title: '工艺审核员',
            align: 'center',
            dataIndex: 'craftPost',
            render: (text, record) => (
                <div>
                    <Button size="small" type="primary" onClick={() => this.openDialog(record.id, 'CRAFT_POST')} ghost>编辑</Button>
                </div>
            )
        }];
    }

    componentWillUpdate(nextProps) {
        if (nextProps.dataSource) {
            const { dataSource: {elements = []} } = nextProps;
            this.elements = rebuildDataWithKey(elements);
        }
    }


    openDialog = (id, type) => {
        const {showDialog, actions: { syncGetAssociatedUser }} = this.props;
        const func = () => {
            showDialog(DIALOG.ORG)();
        };
        func.bind(this);
        syncGetAssociatedUser(id, type).then(func);
    }

    render() {
        return (
            <Table
                className="u-pull-down-sm"
                bordered
                size="middle"
                dataSource={this.elements}
                columns={this.columns}
                pagination={false}
            />);
    }
}

export default OrgListTable;
