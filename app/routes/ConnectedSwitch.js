import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';

export const ConnectedSwitch = connect(state => ({
    location: state.location
}))(Switch);
