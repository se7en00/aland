const proxy = {
    'GET /api/user': {
        id: 1,
        username: 'kenny',
        sex: 6
    },

    'GET /api/user/list': [
        {
            id: 1,
            username: 'kenny',
            age: 6
        }, {
            id: 2,
            username: 'kennys',
            age: 11
        }
    ]
};

module.exports = proxy;
