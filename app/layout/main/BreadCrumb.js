import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames/bind';
import { withRouter} from 'react-router';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import {breadcrumbNameMap} from 'constants';
import style from './BreadCrumb.scss';

const BreadCrumb = (props) => {
    const { location } = props;
    const cx = className.bind(style);

    const separator = <i className="fas fa-angle-right"/>;
    const pathSnippets = location.pathname.split('/').filter(i => i);

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>
                    {breadcrumbNameMap[url]}
                </Link>
            </Breadcrumb.Item>
        );
    });

    const breadcrumbItems = [(
        <Breadcrumb.Item key="home">
            <Link to="/"><i className="fas fa-home"/></Link>
        </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems);

    return (
        <Breadcrumb className={cx('breadcrumb')} separator={separator}>
            {breadcrumbItems}
        </Breadcrumb>
    );
};

BreadCrumb.propTypes = {
    location: PropTypes.object
};

export default withRouter(BreadCrumb);
