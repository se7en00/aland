import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
// import Dialog from 'components/shared/dialog';
import { OnlineLessonList, actionCreators } from 'components/onlineLessons/index';

@connect(state => ({onlineLessons: state.onlineLessons}), mapDispatchToProps)
class OnlineLessonsView extends Component {
    render() {
        return <OnlineLessonList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({...actionCreators, push}, dispatch) };
}

export default OnlineLessonsView;
