import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators, OrgList} from 'components/orgManagement';

@connect(state => ({org: state.org}), mapDispatchToProps)
class OrgManagementView extends Component {
    render() {
        return <OrgList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default OrgManagementView;
