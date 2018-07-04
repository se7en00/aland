import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { PANEL_TITLE } from 'constants';
import panelStyle from '../../../layout/main/Main.scss';
import Header from '../../shared/panel/PanelHeader';
import UserCreationForm from './UserCreationForm';

class UserCreation extends Component {
    render() {
        const {user} = this.props;
        return (
            <Fragment>
                <Header title={PANEL_TITLE.USER_NEW}/>
                <div className={panelStyle.panel__body}>
                    <UserCreationForm user={user}/>
                </div>
            </Fragment>
        );
    }
}

UserCreation.propTypes = {
    user: PropTypes.object
};

export default UserCreation;

