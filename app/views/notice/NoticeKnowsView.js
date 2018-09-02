import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators, NoticeKnowList} from 'components/notice';

@connect(state => ({comments: state.notices?.comments}), mapDispatchToProps)
class NoticeKnowsView extends Component {
    render() {
        return <NoticeKnowList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default NoticeKnowsView;
