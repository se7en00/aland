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

    'POST /api/login/account': (req, res) => {
        const { password, username } = req.body;
        if (password === 'test' && username === 'test') {
            return res.json({
                status: 'ok',
                code: 0,
                token: 'sdfsdfsdfdsf',
                data: {
                    id: 1,
                    username: 'kenny',
                    sex: 6
                }
            });
        }
        return res.json({
            status: 'error',
            code: 403
        });
    }
};

module.exports = proxy;
