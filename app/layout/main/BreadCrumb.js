import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import className from 'classnames/bind';
import { withRouter} from 'react-router';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import {breadcrumbNameMap} from 'constants';
import style from './BreadCrumb.scss';

const getBreadcrumbNameWithParams = (breadcrumbNameMaps, url) => {
    let name = '';
    Object.keys(breadcrumbNameMaps).forEach((item) => {
        const itemRegExpStr = `^${item.replace(/:[\w-]+/g, '[\\w-]+')}$`;
        const itemRegExp = new RegExp(itemRegExpStr);
        if (itemRegExp.test(url)) {
            name = breadcrumbNameMaps[item];
        }
    });
    return name;
};

const BreadCrumb = (props) => {
    const { location, match } = props;
    const cx = className.bind(style);

    const separator = <i className="fas fa-angle-right"/>;
    //分离root path(/aland)，保留目标路径
    const pathSnippets = location.pathname.match(new RegExp(`(?<=${match.path}).*`, 'g'))
        ?.filter(Boolean)[0]
        ?.split('/')
        ?.filter(i => i);

    const extraBreadcrumbItems = pathSnippets?.map((_, index) => {
        const url = `${match.path}/${pathSnippets.slice(0, index + 1).join('/')}`;
        if (breadcrumbNameMap[url] || getBreadcrumbNameWithParams(breadcrumbNameMap, url)) {
            return (
                <Breadcrumb.Item key={url}>
                    {createElement(
                        index === pathSnippets.length - 1 ? 'span' : Link,
                        {to: url },
                        breadcrumbNameMap[url] ||
                        getBreadcrumbNameWithParams(breadcrumbNameMap, url) ||
                        url
                    )}
                </Breadcrumb.Item>
            );
        }
        return null;
    }).filter(Boolean);

    const breadcrumbItems = [(
        <Breadcrumb.Item key="home">
            <Link to="/aland"><i className="fas fa-home"/></Link>
        </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems);

    return (
        <Breadcrumb className={cx('breadcrumb')} separator={separator}>
            {breadcrumbItems}
        </Breadcrumb>
    );
};

BreadCrumb.propTypes = {
    location: PropTypes.object,
    match: PropTypes.object
};

export default withRouter(BreadCrumb);
