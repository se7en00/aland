import typeToReducer from 'type-to-reducer';
import * as TYPES from './actionTypes';

export default typeToReducer({

    [TYPES.SYNC_CHANGE_STUDY_CONTENTS_TYPE]: (state, action) => ({
        ...state,
        type: action.payload
    }),

    [TYPES.ASYNC_LOAD_POINT_CONTENT]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            ...action.payload
        })
    },

    [TYPES.ASYNC_SAVE_POINT_STUDY_CONTENT]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            pointContent: action.payload
        })
    },

    [TYPES.ASYNC_LOAD_MATERIALS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            materials: action.payload
        })
    },

    [TYPES.SYNC_GET_SELECTED_MATERIAL]: (state, action) => ({
        ...state,
        selectedMaterial: action.payload
    }),

    [TYPES.SYNC_REMOVE_SELECTED_MATERIAL]: (state, action) => ({
        ...state,
        selectedMaterial: action.payload
    }),

    // [TYPES.SYNC_EDIT_HOME_WORK]: (state, action) => ({
    //     ...state,
    //     editHomeWork: action.payload
    // }),

    [TYPES.SYNC_EDIT_HOME_WORK]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => {
            console.log(action.payload);
            return {
                ...state,
                editHomeWork: action.payload
            };
        }
    },

    [TYPES.ASYNC_DELETE_HOME_WORK]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => {
            const homeWorkId = action.payload;
            if (state?.homeWorks?.elements && state?.homeWorks?.elements.length) {
                state.homeWorks.elements = state.homeWorks.elements.filter(homeWork => homeWork.id !== homeWorkId);
            }
            return {...state};
        }
    },

    [TYPES.ASYNC_SAVE_HOME_WORK]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => Object.assign(state, {homeWorks: action.payload})
    },

    [TYPES.ASYNC_SAVE_INTERACTION_HOME_WORK]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => Object.assign(state, {homeWorks: action.payload})
    }

}, {});
