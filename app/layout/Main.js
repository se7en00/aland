import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import cn from 'classnames';
import AccountManagement from 'components/accountManagement/AccountManagement';
import Dashboard from 'views/dashboard/Dashboard';
import mainContentStyle from './Main.scss';

const Main = () => {
    const ConnectedSwitch = connect(state => ({
        location: state.location
    }))(Switch);

    const mainClass = cn('col-md-9 col-lg-10', mainContentStyle.mainContent);
    return (
        <main className={mainClass}>
            <div className={mainContentStyle.panel}>
                <ConnectedSwitch>
                    <Route exact path="/" component={Dashboard}/>
                    <Route exact path="/accountManagement" component={AccountManagement}/>
                </ConnectedSwitch>
            </div>
        </main>);
}
;
export default Main;
