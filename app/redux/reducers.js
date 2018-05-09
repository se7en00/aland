import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import dashboardReducer from 'views/dashboard/dashboardReducer';
import loadingReducer from './middleware/loadingReducer';

export default combineReducers({
    loading: loadingReducer,
    routing: routerReducer,
    dashboard: dashboardReducer
});
