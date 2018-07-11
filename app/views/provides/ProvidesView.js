import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { resetForm } from 'redux/globalAction';
import { actionCreators, ProvidesList, ProvidesDetailDialog } from 'components/provides';
import Dialog from 'components/shared/dialog';

@connect(state => ({provides: state.provides}), mapDispatchToProps)
@Dialog(<ProvidesDetailDialog/>)
class ProvidesView extends Component {
    render() {
        return <ProvidesList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({...actionCreators, push, resetForm}, dispatch) };
}

export default ProvidesView;
