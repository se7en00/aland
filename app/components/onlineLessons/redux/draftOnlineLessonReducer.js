import typeToReducer from 'type-to-reducer';
import * as TYPES from './actionTypes';

export default typeToReducer({
    //新建
    [TYPES.CREATE_INITIAL_ONLINE_LESSONS]: {
        REJECTED: (state, action) => ({
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            draftLesson: action.payload
        })
    },
    //新建点
    [TYPES.ASYNC_CREATE_POINTS]: {
        REJECTED: (state, action) => ({
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            pointElements: action.payload
        })
    },

    [TYPES.SYNC_CREATE_CHAPTERS]: (state, action) => {
        let chapters;
        if (state?.chapters) {
            chapters = [...state.chapters, ...action.payload];
        } else {
            chapters = action.payload;
        }
        return {
            ...state,
            chapters
        };
    },

    [TYPES.SYNC_CREATE_SECTIONS]: (state, action) => {
        let sections;
        if (state?.sections) {
            sections = {...state.sections, ...action.payload};
        } else {
            sections = action.payload;
        }
        return {
            ...state,
            sections
        };
    }
}, {});
