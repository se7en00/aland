import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';
import UserCreationForm from '../create/UserCreationForm';

class UserTabs extends Component {
    initUserDetails= () => {
        const {userList} = this.props;
        if (R.isEmpty(userList) || !userList?.userDetails) return null;
        const details = userList.userDetails;
        const result = Object.keys(details).reduce((map, k) => {
            if (k === 'birthday' || k === 'entryDate' || k === 'workDate') {
                map[k] = moment(details[k]);
            } else if (k === 'administrationSuperior' || k === 'deptSuperior') {
                if (typeof details[k] !== 'object') {
                    map[k] = {key: details[k], label: details[k]};
                }
            } else if (k === 'deptId') {
                if (typeof details[k] !== 'object') {
                    map[k] = {key: details[k], label: details?.deptName};
                }
            } else {
                map[k] = details[k];
            }
            return map;
        }, {});

        return {...result};
    }
    render() {
        const TabPane = Tabs.TabPane;
        const {userList: {departments, userLevels, genders}, actions} = this.props;
        return (
            /*<Tabs defaultActiveKey="1" onChange={this.handleChange} tabBarExtraContent={this.reviewOperation}>*/
            <Tabs defaultActiveKey="1" >
                <TabPane tab="人员档案" key="1">
                    <UserCreationForm
                        actions={actions}
                        genders={genders}
                        departments={departments}
                        userLevels={userLevels}
                        initialValues={this.initUserDetails()}
                    />
                </TabPane>
                <TabPane
                    tab="培训记录"
                    key="2">
                    2
                </TabPane>
                <TabPane
                    tab="学习记录"
                    key="3">
                    3
                </TabPane>
                <TabPane
                    tab="学习创作"
                    key="4">
                    4
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
