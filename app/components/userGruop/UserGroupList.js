import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DIALOG, PANEL_TITLE } from 'constants';
import { paginationSetting } from 'utils';
import { Button } from 'antd';
import panelStyle from '../../layout/main/Main.scss';
import Header from '../shared/panel/PanelHeader';
import UserGroupListTable from './UserGroupListTable';

class UserGroupList extends Component {
    static propTypes = {
        showDialog: PropTypes.func,
        actions: PropTypes.objectOf(PropTypes.func),
        userGroup: PropTypes.object
    };

    componentDidMount() {
        this.props.actions.getUserGroupList({pageSize: paginationSetting.pageSize});
    }

    openCreateDialog = () => {
        const {showDialog} = this.props;
        showDialog(DIALOG.CREATE_USER_GROUP)();
    };

    render() {
        const {userGroup: {list}, actions, showDialog} = this.props;
        return (
            <div>
                <Header title={PANEL_TITLE.USER_GROUP_LIST}/>
                <div className={panelStyle.panel__body}>
                    <Button onClick={this.openCreateDialog} type="primary" className="editable-add-btn u-pull-down-md" ghost>新增群组</Button>
                    <UserGroupListTable dataSource={list} actions={actions} showDialog={showDialog}/>
                </div>
            </div>
        );
    }
}

export default UserGroupList;
