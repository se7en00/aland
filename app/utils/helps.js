import uuid from 'uuid/v4';
import { change } from 'redux-form';

export const rebuildDataWithKey = (data) => {
    if (data) {
        return data.map((item, index) => ({
            index: index + 1,
            key: item.id || uuid(),
            ...item
        }));
    }
    return null;
};

export const paginationSetting = {
    showQuickJumper: true,
    size: 'default',
    pageSize: 20
};

export const resetSpecificField = (dispatch, formName, fieldName, newValue) => {
    dispatch(change(formName, fieldName, newValue));
};

export const debounce = (fn, delay) => {
    const timeDelay = delay || 200;
    let timer;
    return (...params) => {
        const th = this;
        const args = params;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            timer = null;
            fn.apply(th, args);
        }, timeDelay);
    };
};

export const format = (str, ...rest) =>
    str.replace(/{(\d+)}/g, (match, number) =>
        (typeof rest[number] !== 'undefined'
            ? rest[number]
            : match));
