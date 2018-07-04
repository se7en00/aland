import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators, ProvidesList} from 'components/provides';

@connect(state => ({provides: state.provides}), mapDispatchToProps)
class ProvidesView extends Component {
    render() {
        return <ProvidesList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default ProvidesView;
