import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router';
import {Accordion, AccordionItem, AccordionTitle, AccordionContent} from 'components/accordion';
import style from './sideBar.scss';
import User from './user/User';

@withRouter
class SideBar extends PureComponent {
    constructor(props) {
        super(props);
        this.activeIndex = [];
        this.renderItems = this.renderItems.bind(this);
        this.preActiveItems = this.preActiveItems.bind(this);
    }

    static propTypes = {
        location: PropTypes.object,
        menuData: PropTypes.array.isRequired
    };

    preActiveItems = () => {
        this.activeIndex = [];
        const {menuData: data, location} = this.props;
        //get domain path
        const domainPath = location.pathname.lastIndexOf('/') === 0 ?
            location.pathname :
            location.pathname.substr(0, location.pathname.lastIndexOf('/') + 1);
        return data.map((item, index) => {
            item.isSelected = false;
            //only single item
            if (item.link && domainPath.match(item.link)) {
                this.activeIndex.push(index);
                item.isSelected = true;
            }

            if (item.subItems) {
                item.subItems.forEach(subItem => {
                    subItem.isSelected = false;
                    if (subItem.link && domainPath.match(subItem.link)) {
                        this.activeIndex.push(index);
                        subItem.isSelected = true;
                    }
                });
            }
            return item;
        });
    }

    renderTitle = (item) => {
        const {name, link, iconName = 'fas fa-question-circle'} = item;
        const hasSubMenu = Object.prototype.hasOwnProperty.call(item, 'subItems');
        const iconClass = classNames(iconName, style.title__icon);
        return (
            <AccordionTitle hideDownIcon={!hasSubMenu}>
                <i className={iconClass}/>
                <span className={style.title__link}>
                    {link ? <NavLink exact to={link}>{name}</NavLink> : name}
                </span>
                {hasSubMenu && <i className="fa fa-chevron-down"/>}
            </AccordionTitle>
        );
    }

    renderSubItems = ({subItems}) => {
        if (subItems) {
            const cx = classNames.bind(style);
            const items = subItems.map((subItem, index) => {
                const uniqueKey = subItem.name + index;
                const activeSubItemClass = cx({'subItem--active': subItem.isSelected});
                return (
                    <li key={uniqueKey} className={activeSubItemClass}>
                        <div className={style.subItem__title}>
                            <NavLink className={style.subItem__link}
                                activeClassName={style.active}
                                exact
                                to={subItem.link}>{subItem.name}</NavLink>
                        </div>
                    </li>
                );
            });
            return (
                <AccordionContent rootTag="ul">
                    {items}
                </AccordionContent>
            );
        }
        return <AccordionContent rootTag="ul"/>;
    }

    renderItems(menuData) {
        const cx = classNames.bind(style);
        return menuData.map((item, index) => {
            const uniqueKey = item.name + index;
            const activeItemClass = cx({'accordion__item--active': item.isSelected && !item.subItems});
            return (
                <AccordionItem rootTag="li" className={activeItemClass} key={uniqueKey}>
                    {this.renderTitle(item)}
                    {this.renderSubItems(item)}
                </AccordionItem>
            );
        });
    }

    render() {
        const menuData = this.preActiveItems();
        const navClass = classNames('col-md-3 col-lg-2', style['c-sidebar']);
        return (
            <nav className={navClass}>
                <User/>
                <Accordion
                    component="ul"
                    theme={style}
                    activeItems={this.activeIndex}
                    allowMultiple={true}
                    composeTheme={false}>
                    {this.renderItems(menuData)}
                </Accordion>
            </nav>
        );
    }
}

export default SideBar;
