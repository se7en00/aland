import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators, LecturersList} from 'components/lecturers';

@connect(state => ({lecturers: state.lecturers}), mapDispatchToProps)
class LecturersView extends Component {
    render() {
        return <LecturersList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default LecturersView;
