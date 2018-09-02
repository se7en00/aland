import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators, NoticeLikeList} from 'components/notice';

@connect(state => ({comments: state.notices?.comments}), mapDispatchToProps)
class NoticeLikeView extends Component {
    render() {
        return <NoticeLikeList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default NoticeLikeView;
