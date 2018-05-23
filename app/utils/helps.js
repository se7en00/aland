export const rebuildDataWithKey = (data) => {
    if (data) {
        return data.map((item, index) => ({
            key: index,
            ...item
        }));
    }
    return null;
};
