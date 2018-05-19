import React from 'react';
import cn from 'classnames';
import { Menu } from 'antd';
import { LogoutView } from 'components/login';
import headerStyle from './Header.scss';
import User from './user/User';

const SubMenu = Menu.SubMenu;

const Header = () => {
    const headerClass = cn('row', headerStyle.headerContainer);
    const logClass = cn('col-md-3 col-lg-2', headerStyle.headerContainer__logo);
    const userClass = cn('col-md-9 col-lg-10', headerStyle['user-item']);

    return (
        <div className={headerClass}>
            <div className={logClass}/>
            <div className={userClass}>
                <Menu mode="horizontal" className={headerStyle.userMenu}>
                    <SubMenu title={<User/>}>
                        <Menu.Item key="setting:1"><LogoutView/></Menu.Item>
                        <Menu.Item key="setting:2">修改密码</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        </div>
    );
};
export default Header;
