import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators, MaterialsList} from 'components/materials';

@connect(state => ({materials: state.materials}), mapDispatchToProps)
class MaterialsView extends Component {
    render() {
        return <MaterialsList {...this.props}/>;
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) };
}

export default MaterialsView;
