import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { PANEL_TITLE } from 'constants';
import panelStyle from '../../../layout/main/Main.scss';
import Header from '../../shared/panel/PanelHeader';
import UserTabs from './UserTabs';

class UserDetails extends Component {
    componentDidMount() {
        const {actions: {getALLAssociations, getUserDetails}, match} = this.props;
        const {userId} = match.params;
        getUserDetails(userId).then(() => getALLAssociations());
    }

    render() {
        const {userList, actions} = this.props;
        return (
            <Fragment>
                <Header title={PANEL_TITLE.USER_DETAILS}/>
                <div className={panelStyle.panel__body}>
                    <UserTabs actions={actions} userList={userList}/>
                </div>
            </Fragment>
        );
    }
}

UserDetails.propTypes = {
    userList: PropTypes.object,
    match: PropTypes.object,
    actions: PropTypes.objectOf(PropTypes.func)
};

export default UserDetails;

