import React, {Component} from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
// import Dialog from 'components/shared/dialog';
import { Tags } from 'components/tags';

// @connect(state => ({oneClick: state.oneClick}), mapDispatchToProps)
class TagsView extends Component {
    render() {
        return <Tags {...this.props}/>;
    }
}

// function mapDispatchToProps(dispatch) {
//     return { actions: bindActionCreators({...actionCreators, push}, dispatch) };
// }

export default TagsView;
