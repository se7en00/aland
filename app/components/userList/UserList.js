import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PANEL_TITLE } from 'constants';
import { paginationSetting } from 'utils';
import { Button } from 'antd';
import panelStyle from '../../layout/main/Main.scss';
import Header from '../shared/panel/PanelHeader';
import UserListTable from './UserListTable';
import UserSearch from './UserSearch';

class UserList extends Component {
    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func),
        userList: PropTypes.object
    };

    componentDidMount() {
        this.props.actions.getUserList({pageSize: paginationSetting.pageSize});
    }

    onSearch = (values) => {
        const {setSearchParamsToRedux, getUserList} = this.props.actions;
        const params = {name: values.name};
        getUserList({pageSize: paginationSetting.pageSize, ...params})
            .then(() => setSearchParamsToRedux(params));
    }

    render() {
        const {userList: {list, searchParams}, actions} = this.props;
        return (
            <div>
                <Header title={PANEL_TITLE.USER_LIST}/>
                <div className={panelStyle.panel__body}>
                    <UserSearch onSubmit={this.onSearch}/>
                    <Button onClick={this.redirect} type="primary" className="editable-add-btn u-pull-down-md" ghost>新增人员</Button>
                    <UserListTable dataSource={list} actions={actions} searchParams={searchParams}/>
                </div>
            </div>
        );
    }
}

export default UserList;
