import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {actionCreators, OneClickCreate} from 'components/oneClick';
import { connect } from 'react-redux';
import { resetForm } from 'redux/globalAction';
import { bindActionCreators } from 'redux';

@connect(state => ({oneClick: state.oneClick}), mapDispatchToProps)
class OneClickAddView extends Component {
    render() {
        return (
            <OneClickCreate {...this.props}/>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({...actionCreators, resetForm}, dispatch) };
}

export default OneClickAddView;
