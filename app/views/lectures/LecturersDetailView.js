import React, { Component } from 'react';
import {actionCreators, LecturersDetail} from 'components/lecturers';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

@connect(state => ({lecturer: state.lecturers?.lecturer}), mapDispatchToProps)
class LecturersDetailView extends Component {
    render() {
        return (
            <LecturersDetail {...this.props}/>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({...actionCreators, push}, dispatch) };
}

export default LecturersDetailView;
