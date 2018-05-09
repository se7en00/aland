import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Panel from './Panel';

class PanelList extends Component {
    static propTypes = {
        loading: PropTypes.bool,
        error: PropTypes.bool,
        loadPanels: PropTypes.func,
        panelList: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object
        ])
    };

    componentDidMount() {
        this.props.loadPanels();
    }

    render() {
        const {loading, error, panelList} = this.props.panelList;
        if (loading) {
            return <p>loading</p>;
        }
        if (error) {
            return <p>Oops, someThing Wrong</p>;
        }

        return panelList.map(item => (
            <Panel {...item} key={item.id}/>
        ));
    }
}

export default PanelList;
