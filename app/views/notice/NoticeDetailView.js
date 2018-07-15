import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { actionCreators, NoticeDetail} from 'components/notice';

@connect(state => ({notices: state.notices}), mapDispatchToProps)
class NoticeDetailView extends Component {
    render() {
        return <NoticeDetail {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({...actionCreators, push}, dispatch) };
}

export default NoticeDetailView;
