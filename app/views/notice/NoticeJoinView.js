import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators, NoticeJoinList} from 'components/notice';

@connect(state => ({comments: state.notices?.comments}), mapDispatchToProps)
class NoticeJoinView extends Component {
    render() {
        return <NoticeJoinList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default NoticeJoinView;
