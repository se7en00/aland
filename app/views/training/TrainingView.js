import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators, TrainingList} from 'components/training';
import { push } from 'react-router-redux';

@connect(state => ({trainings: state.trainings}), mapDispatchToProps)
class TrainingView extends Component {
    render() {
        return <TrainingList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({...actionCreators, push}, dispatch) };
}

export default TrainingView;
