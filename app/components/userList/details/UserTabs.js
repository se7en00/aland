import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import UserInfoForm from '../UserInfoForm';
import Record from '../Record';
// import UserTrainings from './UserTrainings';

class UserTabs extends Component {
    initUserDetails= () => {
        const {userList} = this.props;
        if (R.isEmpty(userList) || !userList?.userDetails) return null;
        const details = userList.userDetails;
       
        const result = Object.keys(details).reduce((map, k) => {
            if (k === 'birthday' || k === 'entryDate' || k === 'workDate') {
                map[k] = details[k] ? moment(details[k]) : '';
            } else if (k === 'administrationSuperior' || k === 'deptSuperior') {
                if (typeof details[k] !== 'object') {
                    map[k] = {key: details[k], label: details[k]};
                }
            } else if (k === 'deptId') {
                if (typeof details[k] !== 'object') {
                    map[k] = {key: details[k], label: details?.deptName};
                }
            } else if (k === 'userGroupId') {
                if (typeof details[k] !== 'object') {
                    map[k] = {key: details[k], label: details?.userGroupName};
                }
            } else if (k === 'gender') {
                map[k] = details[k] == '1' ? '1' : '0';
            } else if (k === 'avatarUrl') {
                map[k] = [details[k]];
            } else {
                map[k] = details[k];
            }
            return map;
        }, {});

        return {...result};
    }
    render() {
        const TabPane = Tabs.TabPane;
        const {userList: {associations}, actions, userId} = this.props;
      
        return (
            /*<Tabs defaultActiveKey="1" onChange={this.handleChange} tabBarExtraContent={this.reviewOperation}>*/
            <Tabs defaultActiveKey="1" >
                <TabPane tab="人员档案" key="1">
                    <UserInfoForm
                        actions={actions}
                        isCreate={false}
                        associations={associations}
                        initialValues={this.initUserDetails()}
                    />
                   
                </TabPane>
                <TabPane tab="培训记录" key="2">
                <Record
                    userId={userId}
                />
                </TabPane>
            </Tabs>
        );
    }
}

UserTabs.propTypes = {
    userList: PropTypes.object,
    // showDialog: PropTypes.func,
    actions: PropTypes.objectOf(PropTypes.func)
};

export default UserTabs;
