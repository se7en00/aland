import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { actionCreators, TrainingCreation} from 'components/training';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

@connect(state => ({trainings: state.trainings}), mapDispatchToProps)
class TrainingCreationView extends Component {
    render() {
        return (
            <TrainingCreation {...this.props}/>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({...actionCreators, push}, dispatch) };
}

export default TrainingCreationView;
