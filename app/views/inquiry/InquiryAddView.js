import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { actionCreators, InquiryDetail} from 'components/inquiries';

@connect(state => ({inquiries: state.inquiries}), mapDispatchToProps)
class InquiryAddView extends Component {
    render() {
        return <InquiryDetail {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({...actionCreators, push}, dispatch) };
}

export default InquiryAddView;
