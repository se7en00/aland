import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PANEL_TITLE, DATE_FORMAT, PATHNAME, getLinkByName } from 'constants';
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
        const {actions: {getUserList, getALLAssociations}} = this.props;
        getUserList({pageSize: paginationSetting.pageSize})
            .then(() => getALLAssociations());
    }

    onSearch = (values) => {
        const {setSearchParamsToRedux, getUserList} = this.props.actions;
        //search 条件
        const params = Object.keys(values).reduce((map, k) => {
            if (k === 'dateTime') {
                map.startDate = moment(values[k][0]).valueOf();
                map.endDate = moment(values[k][1]).valueOf();
            } else {
                map[k] = values[k];
            }
            return map;
        }, {});
        getUserList({pageSize: paginationSetting.pageSize, ...params})
            .then(() => setSearchParamsToRedux(params));
    }

    redirect = () => {
        const {push} = this.props.actions;
        push(`${getLinkByName(PATHNAME.USER_MANAGEMENT)}/creation`);
    }

    render() {
        const {userList: {list, searchParams, associations}, actions} = this.props;
        return (
            <div>
                <Header title={PANEL_TITLE.USER_LIST}/>
                <div className={panelStyle.panel__body}>
                    <UserSearch onSubmit={this.onSearch} departments={associations ? associations.departments : []} userLevels={associations ? associations.userLevels : []}/>
                    <Button onClick={this.redirect} type="primary" className="editable-add-btn u-pull-down-md" ghost>新增人员</Button>
                    <UserListTable dataSource={list} actions={actions} searchParams={searchParams}/>
                </div>
            </div>
        );
    }
}

export default UserList;
