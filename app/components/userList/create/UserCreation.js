import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { PANEL_TITLE } from 'constants';
import panelStyle from '../../../layout/main/Main.scss';
import Header from '../../shared/panel/PanelHeader';
import UserCreationForm from './UserCreationForm';

class UserCreation extends Component {
    componentDidMount() {
        const {actions: {getALLAssociations}} = this.props;
        getALLAssociations();
    }

    render() {
        const {userList: {departments, userLevels, genders}, actions} = this.props;
        return (
            <Fragment>
                <Header title={PANEL_TITLE.USER_NEW}/>
                <div className={panelStyle.panel__body}>
                    <UserCreationForm actions={actions} departments={departments} userLevels={userLevels} genders={genders}/>
                </div>
            </Fragment>
        );
    }
}

UserCreation.propTypes = {
    userList: PropTypes.object,
    actions: PropTypes.objectOf(PropTypes.func)
};

export default UserCreation;

