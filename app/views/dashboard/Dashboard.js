import React from 'react';
import { connect } from 'react-redux';
import List from 'components/dashboard/PanelList';
import { actions } from 'components/dashboard/PanelListRedux';

@connect(state => {
    console.log('state', state);
    return {
        panelList: state.dashboard
    };
}, {
    ...actions
})
class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <List {...this.props}/>
            </div>
        );
    }
}

export default Dashboard;
