import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { actionCreators, NoticesList} from 'components/notice';

@connect(state => ({notices: state.notices}), mapDispatchToProps)
class NoticesView extends Component {
    render() {
        return <NoticesList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({...actionCreators, push}, dispatch) };
}

export default NoticesView;
