import React from 'react';
import cn from 'classnames';
import headerStyle from './Header.scss';
import UserMenu from './user/UserMenu';

const Header = () => {
    const headerClass = cn('row', headerStyle.headerContainer);
    const logClass = cn('col-md-3 col-lg-2', headerStyle.headerContainer__logo);
    const userClass = cn('col-md-9 col-lg-10', headerStyle['user-item']);

    return (
        <div className={headerClass}>
            <div className={logClass}/>
            <div className={userClass}>
                <UserMenu/>
            </div>
        </div>
    );
};
export default Header;
