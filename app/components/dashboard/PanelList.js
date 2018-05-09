import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Panel from './Panel';

class PanelList extends Component {
    static propTypes = {
        loading: PropTypes.bool,
        error: PropTypes.bool,
        loadDashboard: PropTypes.func,
        list: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object
        ])
    };

    componentDidMount() {
        this.props.loadDashboard();
    }

    render() {
        const {list} = this.props.list;
        // if (loading) {
        //     return <p>loading</p>;
        // }
        // if (error) {
        //     return <p>Oops, someThing Wrong</p>;
        // }

        return list.map(item => (
            <Panel {...item} key={item.id}/>
        ));
    }
}

export default PanelList;
