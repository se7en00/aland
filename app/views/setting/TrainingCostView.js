import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { resetForm } from 'redux/globalAction';
import { actionCreators, TrainingCost} from 'components/setting';

@connect(state => ({setting: state.setting}), mapDispatchToProps)
class TrainingCostView extends Component {
    render() {
        return <TrainingCost {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({...actionCreators, push, resetForm}, dispatch) };
}

export default TrainingCostView;
