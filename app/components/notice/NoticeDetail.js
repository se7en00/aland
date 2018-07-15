import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import panelStyle from 'layout/main/Main.scss';
import { connect } from 'react-redux';
import { PANEL_TITLE, PATHNAME, getLinkByName, DATE_FORMAT } from 'constants';
import Header from '../shared/panel/PanelHeader';
import styles from './NoticeDetail.scss';

function mapStateToProps(state) {
    return {
        notice: state.notices?.notice
    };
}

@connect(mapStateToProps)
class NoticeDetail extends Component {
    static propTypes = {
        notice: PropTypes.object,
        actions: PropTypes.object
    };

    componentDidMount() {
        const { notice, actions: { getNotice } } = this.props;
        if (/detail$/g.test(location.pathname) && !notice) {
            const id = location.pathname.match(/(\w)+(?=\/detail$)/g)[0];
            if (id) {
                getNotice(id);
            }
        }
    }

    showDialog = (e, type) => {
        if (e) {
            e.preventDefault();
        }
    };

    hideDialog = () => {
        this.setState({
            dialogVisible: false
        });
    };

    redirect = (e, page) => {
        if (e) {
            e.preventDefault();
        }
        const { notice: { id }, actions: { push }} = this.props;
        push(`${getLinkByName(PATHNAME.NOTES_MANAGEMENT)}/${id}/${page}`);
    };

    render() {
        const { notice = {} } = this.props;
        const { title, content, publishAt } = notice;
        return (
            <Fragment>
                <Header title={PANEL_TITLE.NOTES_EDIT}/>
                <div className={panelStyle.panel__body}>
                    <div className={`col-md-8 col-lg-6 ${styles['notice-detail']}`}>
                        <div>
                            <h2>{title}</h2>
                            <p>{content}</p>
                        </div>
                        <div>
                            <div>接收人: <a href="###" onClick={(e) => this.showDialog(e, 'receiver')}>点击查看</a></div>
                            <div>发布时间: {moment(publishAt).format(DATE_FORMAT)}</div>
                            <div>报名名单: <a href="###" onClick={(e) => this.showDialog(e, 'sign')}>点击查看</a></div>
                            <div>知道名单: <a href="###" onClick={(e) => this.showDialog(e, 'know')}>点击查看</a></div>
                            <div>点赞名单: <a href="###" onClick={(e) => this.showDialog(e, 'like')}>点击查看</a></div>
                            <div>评论名单: <a href="###" onClick={(e) => this.redirect(e, 'comments')}>点击查看</a></div>
                            <div>问卷名单: <a href="###" onClick={(e) => this.showDialog(e, 'inquiry')}>点击查看</a></div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
export default NoticeDetail;
