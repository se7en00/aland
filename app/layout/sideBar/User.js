import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import style from './User.scss';
import ZoeJpg from './zoe.jpg';

class User extends Component {
    render() {
        return (
            <div className={style['c-user']}>
                <img className={style.avatar} src={ZoeJpg} width="80" height="80" alt=""/>
                <h4>小花</h4>
            </div>
        );
    }
}

export default User;
