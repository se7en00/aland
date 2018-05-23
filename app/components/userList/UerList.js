import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PANEL_TITLE } from 'constants';
import { rebuildDataWithKey } from 'utils';
import { Button } from 'antd';
import Header from '../panel/PanelHeader';
import UserTable from './UserListTable';

class UserList extends Component {
    static propTypes = {
        showDialog: PropTypes.func,
        userList: PropTypes.object,
        getUserList: PropTypes.func
    };

    componentDidMount() {
        this.props.getUserList();
    }

    render() {
        let {userList: {list}} = this.props;
        list = rebuildDataWithKey(list);
        return (
            <div>
                <Header title={PANEL_TITLE.ACCOUNT}/>
                <Button className="editable-add-btn" onClick={this.props.showDialog('createAccount')}>Add</Button>
                <UserTable dataSource={list} showDialog={this.props.showDialog}/>
            </div>
        );
    }
}

export default UserList;
