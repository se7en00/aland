import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators, OrgList, OrgDialog} from 'components/orgManagement';
import Dialog from 'components/shared/dialog';

@connect(state => ({org: state.org}), mapDispatchToProps)
@Dialog(<OrgDialog/>)
class OrgManagementView extends Component {
    render() {
        return <OrgList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default OrgManagementView;
