import React from 'react';
import cn from 'classnames';
import { LogoutView } from 'components/login';
import Breadcrumb from './HeaderBreadcrumb';
import headerStyle from './Header.scss';


const Header = () => {
    const headerClass = cn('row', headerStyle.headerContainer);
    const logClass = cn('col-md-3 col-lg-2', headerStyle.headerContainer__logo);
    const navClass = cn('col-md-9 col-lg-10', headerStyle['nav-header']);

    return (
        <div className={headerClass}>
            <div className={logClass}>
              222
            </div>
            <div className={navClass}>
                <Breadcrumb/>
                <LogoutView/>
            </div>
        </div>
    );
};
export default Header;
