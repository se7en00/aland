const account = {
    'GET /api/user': {
        id: 1,
        username: 'test',
        password: 'test'
    },

    'GET /api/users': [
        {
            id: 1,
            username: 'kenny',
            accountName: '大龙'
        }, {
            id: 2,
            username: 'test',
            accountName: '中龙'
        }, {
            id: 3,
            username: 'seven',
            accountName: '小龙'
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

module.exports = account;
