import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { loginReducer } from 'components/login';
import { accountListReducer } from 'components/accountList';
import { dashboardReducer } from 'components/dashboard';
import { onlineLessonsList } from 'components/onlineLessons';
import loadingReducer from './middleware/loadingReducer';

export default combineReducers({
    loading: loadingReducer,
    routing: routerReducer,
    dashboard: dashboardReducer,
    accountList: accountListReducer,
    user: loginReducer,
    onlineLessons: onlineLessonsList,
    form: formReducer
});
