import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators, TrainingList} from 'components/training';

@connect(state => ({trainings: state.trainings}), mapDispatchToProps)
class TrainingDetailsView extends Component {
    render() {
        return <TrainingList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default TrainingDetailsView;
