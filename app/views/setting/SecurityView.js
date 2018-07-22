import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { resetForm } from 'redux/globalAction';
import { actionCreators, SecurityList, SecurityDialog, SecurityEditDialog } from 'components/setting';
import Dialog from 'components/shared/dialog';

@connect(state => ({setting: state.setting}), mapDispatchToProps)
@Dialog(<SecurityDialog/>, <SecurityEditDialog/>)
class SecurityView extends Component {
    render() {
        return <SecurityList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({...actionCreators, push, resetForm}, dispatch) };
}

export default SecurityView;
