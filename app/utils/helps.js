import uuid from 'uuid/v4';

export const rebuildDataWithKey = (data) => {
    if (data) {
        return data.map((item, index) => ({
            index: index + 1,
            key: uuid(),
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
