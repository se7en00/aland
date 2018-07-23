import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import panelStyle from 'layout/main/Main.scss';
import { connect } from 'react-redux';
import { PANEL_TITLE, PATHNAME, getLinkByName, DATE_FORMAT } from 'constants';
import { paginationSetting } from 'utils';
import {message} from 'antd/lib';
import Header from '../shared/panel/PanelHeader';
import styles from './NewsDetail.scss';
import NewsCommentsList from './NewsCommentsList';
import NewsReceiverDialog from './NewsReceiverDialog';

function mapStateToProps(state) {
    return {
        news: state.news?.news,
        comments: state.news?.comments
    };
}
@connect(mapStateToProps)
class NewsDetail extends Component {
    static propTypes = {
        news: PropTypes.object,
        comments: PropTypes.object,
        actions: PropTypes.object
    };

    state = {
        dialogVisible: false,
        currentDialog: ''
    };

    componentDidMount() {
        const { news, actions: { getNews, getNewsComments } } = this.props;
        if (/detail$/g.test(location.pathname) && !news) {
            const id = location.pathname.match(/(\w)+(?=\/detail$)/g)[0];
            if (id) {
                getNews(id);
                getNewsComments(id, {pageSize: paginationSetting.pageSize});
            }
        }
    }

    showDialog = (e, type) => {
        if (e) {
            e.preventDefault();
        }
        this.setState({
            dialogVisible: true,
            currentDialog: type
        });
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
        const { news: { id }, actions: { push }} = this.props;
        push(`${getLinkByName(PATHNAME.NEWS_MANAGEMENT)}/${id}/${page}`);
    };

    toggleCommentStatus = (commentId, status) => {
        const { news: { id }, comments: {paging: {size, page} }, actions: { toggleCommentStatus, getNewsComments } } = this.props;
        const newStatus = status ? 'disable' : 'enable';
        toggleCommentStatus(id, commentId, newStatus).then(() => {
            message.success('操作成功！');
            getNewsComments(id, {size, page});
        }).catch(() => {
            message.success('操作失败！');
        });
    };

    render() {
        const { news = {}, comments, actions } = this.props;
        const { title, content, publishAt, receiverType, receivers } = news;
        const { currentDialog, dialogVisible } = this.state;
        const data = receivers?.map(r => r.receiverName);
        return (
            <Fragment>
                <Header title={PANEL_TITLE.NEWS_EDIT}/>
                <div className={panelStyle.panel__body}>
                    <div className={`col-md-8 col-lg-6 ${styles['news-detail']}`}>
                        <div>
                            <h2>{title}</h2>
                            {/*eslint-disable-next-line*/}
                            <p dangerouslySetInnerHTML={{__html: content}}/>
                        </div>
                        <div>
                            <div>接收人: <a href="###" onClick={(e) => this.showDialog(e, 'receiver')}>点击查看</a></div>
                            <div>发布时间: {moment(publishAt).format(DATE_FORMAT)}</div>
                            <div>知道名单: <a href="###" onClick={(e) => this.showDialog(e, 'know')}>点击查看</a></div>
                            <div>点赞名单: <a href="###" onClick={(e) => this.showDialog(e, 'like')}>点击查看</a></div>
                        </div>
                        <br/>
                        <div>
                            <h3>评论列表</h3>
                            <NewsCommentsList
                                comments={comments}
                                actions={actions}
                                toggleStatus={this.toggleCommentStatus}
                            />
                        </div>
                    </div>
                </div>
                <NewsReceiverDialog
                    data={data}
                    type={receiverType}
                    visible={dialogVisible && currentDialog === 'receiver'}
                    onHide={this.hideDialog}
                />
            </Fragment>
        );
    }
}
export default NewsDetail;
