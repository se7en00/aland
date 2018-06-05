import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {OnlineLessonsCreate, CreateChapterDialog, CreateSectionDialog, CreatePointDialog, actionCreators} from 'components/onlineLessons/index';
import Dialog from 'components/shared/dialog/index';
import { connect } from 'react-redux';
import { resetForm } from 'redux/globalAction';
import { bindActionCreators } from 'redux';

@connect(state => ({onlineLessons: state.onlineLessons}), mapDispatchToProps)
@Dialog(<CreateChapterDialog/>, <CreateSectionDialog/>, <CreatePointDialog/>)
class OnlineLessonsAddView extends Component {
    render() {
        return (
            <OnlineLessonsCreate {...this.props}/>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({...actionCreators, resetForm}, dispatch) };
}

export default OnlineLessonsAddView;
