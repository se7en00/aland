import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PointContent, pointActionCreators, MaterialDialog, HomeWorkDialog, InteractionWorkDialog } from 'components/onlineLessons';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import Dialog from 'components/shared/dialog';

@connect(state => ({point: state.point}), mapDispatchToProps)
@withRouter
@Dialog(<MaterialDialog/>, <HomeWorkDialog/>, <InteractionWorkDialog/>)
class OnlineLessonsPointView extends Component {
    render() {
        return (
            <PointContent {...this.props}/>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({...pointActionCreators}, dispatch) };
}

export default OnlineLessonsPointView;
