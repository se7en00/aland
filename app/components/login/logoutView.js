import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from './loginAction';

const LogoutView = (props) => {
    const handleClick = () => {
        props.logout();
    };
    return (
        <div>
            <button onClick={handleClick}>logout</button>
        </div>
    );
};

LogoutView.propTypes = {
    logout: PropTypes.func
};

export default connect(null, {logout})(LogoutView);
