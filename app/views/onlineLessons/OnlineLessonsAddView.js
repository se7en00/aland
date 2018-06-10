import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import {OnlineLessonsCreate, CreateChapterDialog, CreateSectionDialog, CreatePointDialog, draftLessonActionCreators} from 'components/onlineLessons';
import Dialog from 'components/shared/dialog/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
    return { actions: bindActionCreators({...draftLessonActionCreators}, dispatch) };
}

export default OnlineLessonsAddView;
