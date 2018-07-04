import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { loginReducer } from 'components/login';
import { accountListReducer } from 'components/accountList';
import { userListReducer } from 'components/userList';
import { userGroupReducer } from 'components/userGruop';
import { orgListreducer } from 'components/orgManagement';
import { dashboardReducer } from 'components/dashboard';
import { onlineLessonsReducer, draftOnlineLessonsReducer, pointReducer} from 'components/onlineLessons';
import { oneClickReducer } from 'components/oneClick';
import loadingReducer from './middleware/loadingReducer';

export default combineReducers({
    loading: loadingReducer,
    routing: routerReducer,
    dashboard: dashboardReducer,
    accountList: accountListReducer,
    user: loginReducer,
    userList: userListReducer,
    userGroup: userGroupReducer,
    org: orgListreducer,
    onlineLessons: onlineLessonsReducer,
    draftOnlineLesson: draftOnlineLessonsReducer,
    point: pointReducer,
    oneClick: oneClickReducer,
    form: formReducer
});
