import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators, NoticeInquirysList} from 'components/notice';

@connect(state => ({comments: state.notices?.comments}), mapDispatchToProps)
class NoticeInquirysView extends Component {
    render() {
        return <NoticeInquirysList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default NoticeInquirysView;
