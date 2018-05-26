import React from 'react';
import style from './User.scss';
import ZoeJpg from './zoe.jpg';

const UserAvatar = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <div className={style['c-user']}>
            <img className={style.avatar} src={ZoeJpg} width="30" height="30" alt=""/>
            <span>{user.name}</span>
        </div>
    );
};

export default UserAvatar;
