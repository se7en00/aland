import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators, SummaryList} from 'components/summary';
import { push } from 'react-router-redux';

@connect(state => ({summary: state.summary}), mapDispatchToProps)
class SummaryView extends Component {
    render() {
        return <SummaryList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({...actionCreators, push}, dispatch) };
}

export default SummaryView;
