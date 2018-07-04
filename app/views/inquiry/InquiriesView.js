import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators, InquiriesList} from 'components/inquiries';

@connect(state => ({inquiries: state.inquiries}), mapDispatchToProps)
class InquiriesView extends Component {
    render() {
        return <InquiriesList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default InquiriesView;
