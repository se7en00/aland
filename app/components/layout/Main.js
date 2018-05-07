import React from 'react';
import { Switch, Route } from 'react-router-dom';
import cn from 'classnames';
import AccountManagement from 'components/accountManagement/AccountManagement';
import Home from './Home';
import mainContentStyle from './Main.scss';

const Main = () => {
    const mainClass = cn('col-md-9 col-lg-10', mainContentStyle.mainContent);
    return (
        <main className={mainClass}>
            <div className={mainContentStyle.panel}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/accountManagement" component={AccountManagement}/>
                </Switch>
            </div>
        </main>);
}
;
export default Main;
