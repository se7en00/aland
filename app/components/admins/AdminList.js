import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PANEL_TITLE, DIALOG } from 'constants';
import { Button } from 'antd';
import { paginationSetting } from 'utils';
import panelStyle from 'layout/main/Main.scss';
import Header from '../shared/panel/PanelHeader';
import AdminTable from './AdminTable';

class AdminList extends Component {
    static propTypes = {
        showDialog: PropTypes.func,
        actions: PropTypes.objectOf(PropTypes.func),
        adminList: PropTypes.object
    };

    componentDidMount() {
        this.props.actions.getAdminList({pageSize: paginationSetting.pageSize});
    }

    render() {
        const {adminList, actions} = this.props;
        const list = adminList?.list;
        return (
            <div>
                <Header title={PANEL_TITLE.ACCOUNT}/>
                <div className={panelStyle.panel__body}>
                    <Button type="primary" className="editable-add-btn" onClick={this.props.showDialog(DIALOG.CREATE_USER)} ghost>新增账户</Button>
                    <AdminTable dataSource={list} actions={actions} showDialog={this.props.showDialog}/>
                </div>
            </div>
        );
    }
}

export default AdminList;
