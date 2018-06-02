const onlineLessons = {
    'GET /api/onlineLessons': (req, res) => res.json({
        elements: [{
            id: 1,
            lessonName: '质量零缺陷与TQM全面质理管理',
            status: '审核中',
            master: '城西老大哥',
            securityPermission: '末设置',
            creator: '城西小混混',
            creationDate: '2018-3-5'
        },
        {
            id: 2,
            lessonName: '高效仓储与工厂物料配送',
            status: '上架',
            master: '城北老大哥',
            securityPermission: 'B级',
            creator: '城北小混混',
            creationDate: '2018-4-9'
        }, {
            id: 3,
            lessonName: '以人民为中心的发展思想',
            status: '通过上架',
            master: '城东一把手',
            securityPermission: 'A级',
            creator: '城东小混混',
            creationDate: '2018-6-1'
        }],

        paging: {
            size: 10,
            page: 1,
            total: 10
        }
    })
};

module.exports = onlineLessons;
