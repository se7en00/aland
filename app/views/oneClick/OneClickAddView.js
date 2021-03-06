import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {actionCreators, OneClickCreate, OneClickTagDialog} from 'components/oneClick';
import { connect } from 'react-redux';
import { resetForm } from 'redux/globalAction';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import Dialog from 'components/shared/dialog';

@connect(state => ({oneClick: state.oneClick}), mapDispatchToProps)
@Dialog(<OneClickTagDialog/>)
class OneClickAddView extends Component {
    render() {
        return (
            <OneClickCreate {...this.props}/>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({...actionCreators, resetForm, push}, dispatch) };
}

export default OneClickAddView;
