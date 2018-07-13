import React, { Component } from 'react';
import {actionCreators, LecturersCreate} from 'components/lecturers';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

@connect(state => ({lecturers: state.lecturers}), mapDispatchToProps)
class LecturesAddView extends Component {
    render() {
        return (
            <LecturersCreate {...this.props}/>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({...actionCreators, push}, dispatch) };
}

export default LecturesAddView;
