const proxy = {
    'GET /api/user': {
        id: 1,
        username: 'test',
        password: 'test'
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
    ],

    'POST /api/login/account': (req, res) => res.json({
        token: 'ssssdddd',
        userInfo: {
            id: '111',
            name: 'test'
        }
    })
};

module.exports = proxy;
