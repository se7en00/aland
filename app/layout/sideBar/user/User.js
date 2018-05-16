import React from 'react';
import style from './User.scss';
import ZoeJpg from './zoe.jpg';


const User = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <div className={style['c-user']}>
            <img className={style.avatar} src={ZoeJpg} width="80" height="80" alt=""/>
            <h4>{user.name}</h4>
        </div>
    );
};

export default User;
