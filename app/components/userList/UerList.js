import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PANEL_TITLE, DIALOG } from 'constants';
import { Button } from 'antd';
import { paginationSetting } from 'utils';
import panelStyle from 'layout/main/Main.scss';
import Header from '../panel/PanelHeader';
import UserTable from './UserListTable';

class UserList extends Component {
    static propTypes = {
        showDialog: PropTypes.func,
        actions: PropTypes.objectOf(PropTypes.func),
        userList: PropTypes.object
    };

    componentDidMount() {
        this.props.actions.getUserList(paginationSetting.pageSize);
    }

    render() {
        const {userList: {list}, actions} = this.props;
        return (
            <div>
                <Header title={PANEL_TITLE.ACCOUNT}/>
                <div className={panelStyle.panel__body}>
                    <Button type="primary" className="editable-add-btn" onClick={this.props.showDialog(DIALOG.CREATE_USER)} ghost>新增账户</Button>
                    <UserTable dataSource={list} actions={actions} showDialog={this.props.showDialog}/>
                </div>
            </div>
        );
    }
}

export default UserList;
