import typeToReducer from 'type-to-reducer';
import * as TYPES from './actionTypes';

export default typeToReducer({
    //新建
    [TYPES.CREATE_INITIAL_ONLINE_LESSONS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            draftLesson: action.payload
        })
    },
    //新建点
    [TYPES.ASYNC_CREATE_POINTS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => {
            const result = action.payload;
            const hasDraftLessonAttr = Object.prototype.hasOwnProperty.call(result, 'draftLesson');
            return Object.assign(state, {pointElements: result.pointElements}, hasDraftLessonAttr ? { draftLesson: result.draftLesson} : {});
        }
    },

    [TYPES.ASYNC_REMOVE_POINTS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => {
            const removePoint = action.payload;
            state.pointElements.points = state.pointElements.points.filter(item => item.id !== removePoint.pointId);
            return {
                ...state
            };
        }
    },

    //重置
    [TYPES.SYNC_RESET_INITIAL_ONLINE_LESSONS]: (state, action) => ({
        ...state,
        draftLesson: action.payload,
        chapters: action.payload,
        sections: action.payload,
        pointElements: action.payload
    }),

    [TYPES.LOAD_ONLINE_LESSONS_CATEGORIES]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            categoryList: action.payload
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
