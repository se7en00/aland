import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { resetForm } from 'redux/globalAction';
import { actionCreators, CourseDirectionList, CourseDirectionDialog, CourseDirectionEditDialog } from 'components/courseDirection';
import Dialog from 'components/shared/dialog';

@connect(state => ({courserDirection: state.courserDirection}), mapDispatchToProps)
@Dialog(<CourseDirectionDialog/>, <CourseDirectionEditDialog/>)
class CourseDirectionView extends Component {
    render() {
        return <CourseDirectionList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({...actionCreators, push, resetForm}, dispatch) };
}

export default CourseDirectionView;
