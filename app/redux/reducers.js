import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import panelList from 'components/dashboard/PanelListRedux';

export default combineReducers({
    routing: routerReducer,
    dashboard: panelList
});
