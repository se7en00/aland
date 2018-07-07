import React, { Component } from 'react';
import { actionCreators, MaterialsDetail } from 'components/materials';
// import Dialog from 'components/shared/dialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

@connect(state => ({materials: state.materials}), mapDispatchToProps)
class MaterialsEditView extends Component {
    static propTypes = {
        materials: PropTypes.object
    };
    render() {
        const { materials: { material } } = this.props;
        return (
            <MaterialsDetail
                {...this.props}
                initialValues={material}
            />
        );
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({...actionCreators, push}, dispatch) };
}

export default MaterialsEditView;
