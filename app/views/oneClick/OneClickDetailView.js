import React, { Component } from 'react';
import {actionCreators, OneClickDetail, OneClickTagDialog} from 'components/oneClick';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import Dialog from 'components/shared/dialog';

@connect(state => ({oneClick: state.oneClick}), mapDispatchToProps)
@Dialog(<OneClickTagDialog/>)
class OneClickDetailView extends Component {
    render() {
        return (
            <OneClickDetail {...this.props}/>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({...actionCreators, push}, dispatch) };
}

export default OneClickDetailView;
