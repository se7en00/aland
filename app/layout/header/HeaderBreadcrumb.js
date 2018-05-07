import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { withRouter} from 'react-router';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import {breadcrumbNameMap} from 'constants';
import headerStyle from './Header.scss';

const HeaderBreadcrumb = (props) => {
    const { location } = props;
    const cx = classnames.bind(headerStyle);
    const breadcrumbClass = cx('nav-header__breadcrumb');
    const breadcrumbLinkClass = cx('breadcrumb__link');

    const separator = <i className="fas fa-angle-right"/>;
    const pathSnippets = location.pathname.split('/').filter(i => i);

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url} className={breadcrumbLinkClass}>
                <Link to={url}>
                    {breadcrumbNameMap[url]}
                </Link>
            </Breadcrumb.Item>
        );
    });

    const breadcrumbItems = [(
        <Breadcrumb.Item key="home" className={breadcrumbLinkClass}>
            <Link to="/"><i className="fas fa-home"/></Link>
        </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems);
    return (
        <Breadcrumb className={breadcrumbClass} separator={separator}>
            {breadcrumbItems}
        </Breadcrumb>
    );
};

HeaderBreadcrumb.propTypes = {
    location: PropTypes.object
};

export default withRouter(HeaderBreadcrumb);
