import { combineReducers } from 'redux';
import sideBarReducer from 'layout/sideBar/SideBarRedux';

const allReducers = {
    sideBar: sideBarReducer
};

const rootReducer = combineReducers(allReducers);

export default rootReducer;
