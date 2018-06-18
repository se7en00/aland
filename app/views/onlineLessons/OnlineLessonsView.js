import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
// import Dialog from 'components/shared/dialog';
import { OnlineLessonList, actionCreators, draftLessonActionCreators } from 'components/onlineLessons';

@connect(state => ({onlineLessons: state.onlineLessons}), mapDispatchToProps)
class OnlineLessonsView extends Component {
    render() {
        return <OnlineLessonList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    const {resetDraftLessons, getCourseDetails} = draftLessonActionCreators;
    return { actions: bindActionCreators({...actionCreators, push, resetDraftLessons, getCourseDetails}, dispatch) };
}

export default OnlineLessonsView;
