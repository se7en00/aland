import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import { loginReducer } from 'components/login';
import adminsReducer from 'components/admins/redux/adminListReducer'; //fix issue
import { userListReducer } from 'components/userList';
import { userGroupReducer } from 'components/userGruop';
import { orgListreducer } from 'components/orgManagement';
import { dashboardReducer } from 'components/dashboard';
import { onlineLessonsReducer, draftOnlineLessonsReducer, pointReducer} from 'components/onlineLessons';
import { oneClickReducer } from 'components/oneClick';
import { materialsReducer } from 'components/materials';
import { examsReducer } from 'components/exams';
import { inquiriesReducer } from 'components/inquiries';
import { lecturersReducer } from 'components/lecturers';
import { providesReducer } from 'components/provides';
import { noticesReducer } from 'components/notice';
import { newsReducer } from 'components/news';
import loadingReducer from './middleware/loadingReducer';

export default combineReducers({
    loading: loadingReducer,
    routing: routerReducer,
    dashboard: dashboardReducer,
    user: loginReducer,
    userList: userListReducer,
    userGroup: userGroupReducer,
    org: orgListreducer,
    onlineLessons: onlineLessonsReducer,
    draftOnlineLesson: draftOnlineLessonsReducer,
    point: pointReducer,
    oneClick: oneClickReducer,
    materials: materialsReducer,
    exams: examsReducer,
    inquiries: inquiriesReducer,
    lecturers: lecturersReducer,
    provides: providesReducer,
    form: formReducer,
    adminList: adminsReducer,
    notices: noticesReducer,
    news: newsReducer
});
