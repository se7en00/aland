export const rebuildDataWithKey = (data) => {
    if (data) {
        return data.map((item, index) => ({
            index: index + 1,
            key: index,
            ...item
        }));
    }
    return null;
};
