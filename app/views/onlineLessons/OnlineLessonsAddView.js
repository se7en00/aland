import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {OnlineLessonsCreate, CreateChapterDialog, CreateSectionDialog, CreatePointDialog, draftLessonActionCreators} from 'components/onlineLessons';
import Dialog from 'components/shared/dialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

@connect(state => ({draftOnlineLesson: state.draftOnlineLesson}), mapDispatchToProps)
@Dialog(<CreateChapterDialog/>, <CreateSectionDialog/>, <CreatePointDialog/>)
class OnlineLessonsAddView extends Component {
    render() {
        return (
            <OnlineLessonsCreate {...this.props}/>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({...draftLessonActionCreators, push}, dispatch) };
}

export default OnlineLessonsAddView;
