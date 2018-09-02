import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators, NoticeSreceiversList} from 'components/notice';

@connect(state => ({comments: state.notices?.comments}), mapDispatchToProps)
class NoticeSreceiversView extends Component {
    render() {
        return <NoticeSreceiversList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default NoticeSreceiversView;
