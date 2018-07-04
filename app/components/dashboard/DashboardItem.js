import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import style from './DashboardItem.scss';

class DashboardItem extends Component {
    static propTypes = {
        details: PropTypes.object
    };

    render() {
        const itemClassName = cn('col-md-5 col-lg-5', style.item);
        const {details} = this.props;
        if (!details && R.isEmpty(details)) return;
        return (
            <div className={style.dashboardContainer}>
                <div className="row">
                    <div className={itemClassName}>
                        <span className={style.count}>{details?.studyCount || 0}</span>
                        <span className={style.title}>学员学习次数</span>
                    </div>
                    <div className={itemClassName}>
                        <span className={style.count}>{details?.loginCount || 0}</span>
                        <span className={style.title}>学员登录次数</span>
                    </div>
                </div>
                <div className="row">
                    <div className={itemClassName}>
                        <span className={style.count}>{details?.pediaCount || 0}</span>
                        <span className={style.title}>一点通创作个数</span>
                    </div>
                    <div className={itemClassName}>
                        <span className={style.count}>{details?.courseCount || 0}</span>
                        <span className={style.title}>线上创作个数</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardItem;
