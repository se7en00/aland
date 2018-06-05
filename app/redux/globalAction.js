import {reset} from 'redux-form';
//sync
export const resetForm = (formName) => dispatch => {
    dispatch(reset(formName));
};
