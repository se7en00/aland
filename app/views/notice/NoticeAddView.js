import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { actionCreators, NoticeCreate} from 'components/notice';

@connect(state => ({notices: state.notices}), mapDispatchToProps)
class NoticeAddView extends Component {
    render() {
        return <NoticeCreate {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({...actionCreators, push}, dispatch) };
}

export default NoticeAddView;
