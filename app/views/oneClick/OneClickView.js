import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
// import Dialog from 'components/shared/dialog';
import { OneClickList, actionCreators } from 'components/oneClick';

@connect(state => ({oneClick: state.oneClick}), mapDispatchToProps)
class OnClickView extends Component {
    render() {
        return <OneClickList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({...actionCreators, push}, dispatch) };
}

export default OnClickView;
