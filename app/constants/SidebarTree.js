import {PATHNAME} from './Constants';

const SIDE_BAR_MENU = [
    //系统管理
    {
        name: PATHNAME.SYSTEM_MANAGEMENT,
        iconName: 'fas fa-cog',
        subItems: [
            {name: PATHNAME.ACCOUNT_MANAGEMENT, link: '/accountManagement'},
            {name: PATHNAME.ORG, link: '/orgManagement'},
            {name: PATHNAME.USER_MANAGEMENT, link: '/userManagement'},
            {name: PATHNAME.STUDENT_MANAGEMENT, link: '/studentManagement'}
        ]
    },
    {
        name: PATHNAME.NEWS_MANAGEMENT,
        iconName: 'far fa-newspaper',
        subItems: [
            {name: PATHNAME.NEWS_MANAGEMENT, link: '/newsManagement'},
            {name: PATHNAME.NOTES_MANAGEMENT, link: '/notesManagement'}
        ]
    },
    {
        name: PATHNAME.RESOURCE_MANAGEMENT,
        iconName: 'far fa-list-alt',
        subItems: [
            {name: PATHNAME.ONLINE_LESSONS, link: '/onlineLessons'},
            {name: PATHNAME.SINGLE_LESSONS, link: '/singleLessons'},
            {name: PATHNAME.KNOWLEDGE, link: '/knowledge'},
            {name: PATHNAME.MATERIALS, link: '/materials'},
            {name: PATHNAME.QUEST_BANK, link: '/questBank'},
            {name: PATHNAME.QUESTIONNAIRE_BANK, link: '/questionnaire'},
            {name: PATHNAME.MASTER, link: '/master'},
            {name: PATHNAME.VENDOR, link: '/vendor'}
        ]
    },
    {
        name: PATHNAME.TRAINING,
        iconName: 'fas fa-chalkboard-teacher',
        subItems: [
            {name: PATHNAME.PUBLISHED_TRAINING, link: '/publishedTraining'},
            {name: PATHNAME.TRAINING_DRAFt, link: '/draftedTraining'}
        ]
    },
    {name: PATHNAME.LEARN_TASK, link: '/taskManagement', iconName: 'far fa-clone'},
    {name: PATHNAME.LEARN_PROJECT, link: '/projectManagement', iconName: 'fas fa-clipboard-list'},
    {
        name: PATHNAME.SETTING,
        iconName: 'fas fa-wrench',
        subItems: [
            {name: PATHNAME.TAG_SETTING, link: '/tagSetting'},
            {name: PATHNAME.SECURITY_PERMISSION_CATEGORY, link: '/securityPermissionSetting'},
            {name: PATHNAME.LESSONS_DIRECTION_SETTING, link: '/lessonsDirectionSetting'},
            {name: PATHNAME.TRAINING_AND_COST, link: '/trainingCostSetting'},
            {name: PATHNAME.CAROUSEL_SETTING, link: '/carouselSetting'}
        ]
    }
];

const renderSideBarWithPermissions = () => {
    if (localStorage.getItem('user')) {
        const {permissions} = JSON.parse(localStorage.getItem('user'));
        //没有权限
        if (!permissions || permissions.length === 0) return null;

        //分类
        const formatPermissions = permissions.reduce((result, permission) => {
            const {permissionType, menuName} = permission;
            if (!result[permissionType]) {
                result[permissionType] = [menuName];
            } else {
                result[permissionType].push(menuName);
            }
            return result;
        }, {});

        const resultss = SIDE_BAR_MENU.filter(item => {
            //先过滤一级菜单
            if (Object.keys(formatPermissions).includes(item.name)) {
                const menu = item;
                const allSubMenusUnderFirstMenu = formatPermissions[item.name];
                //过滤二级菜单
                if (menu.subItems) {
                    menu.subItems = menu.subItems.filter(subItem => allSubMenusUnderFirstMenu.includes(subItem.name));
                }
                return menu;
            }
            return false;
        });

        return resultss;
    }
};

export {
    SIDE_BAR_MENU as default,
    renderSideBarWithPermissions
};
