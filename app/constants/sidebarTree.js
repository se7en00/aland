import * as R from 'ramda';
import {PATHNAME} from './Constants';

const ROOT_PATH = '/aland';
const SIDE_BAR_MENU = [
    //系统管理
    {
        name: PATHNAME.SYSTEM_MANAGEMENT,
        iconName: 'fas fa-cog',
        subItems: [
            {name: PATHNAME.ACCOUNT_MANAGEMENT, link: `${ROOT_PATH}/accountManagement`},
            {name: PATHNAME.ORG, link: `${ROOT_PATH}/orgManagement`},
            {name: PATHNAME.USER_MANAGEMENT, link: `${ROOT_PATH}/userManagement`},
            {name: PATHNAME.STUDENT_MANAGEMENT, link: `${ROOT_PATH}/studentManagement`}
        ]
    },
    {
        name: PATHNAME.INFORMATION_MANAGEMENT,
        iconName: 'far fa-newspaper',
        subItems: [
            {name: PATHNAME.NEWS_MANAGEMENT, link: `${ROOT_PATH}/newsManagement`},
            {name: PATHNAME.NOTES_MANAGEMENT, link: `${ROOT_PATH}/notesManagement`}
        ]
    },
    {
        name: PATHNAME.RESOURCE_MANAGEMENT,
        iconName: 'far fa-list-alt',
        subItems: [
            {name: PATHNAME.ONLINE_LESSONS, link: `${ROOT_PATH}/onlineLessons`},
            {name: PATHNAME.SINGLE_LESSONS, link: `${ROOT_PATH}/singleLessons`},
            {name: PATHNAME.KNOWLEDGE, link: `${ROOT_PATH}/knowledge`},
            {name: PATHNAME.MATERIALS, link: `${ROOT_PATH}/materials`},
            {name: PATHNAME.QUEST_BANK, link: `${ROOT_PATH}/questBank`},
            {name: PATHNAME.QUESTIONNAIRE_BANK, link: `${ROOT_PATH}/questionnaire`},
            {name: PATHNAME.MASTER, link: `${ROOT_PATH}/master`},
            {name: PATHNAME.VENDOR, link: `${ROOT_PATH}/vendor`}
        ]
    },
    {
        name: PATHNAME.TRAINING,
        iconName: 'fas fa-chalkboard-teacher',
        subItems: [
            {name: PATHNAME.PUBLISHED_TRAINING, link: `${ROOT_PATH}/publishedTraining`},
            {name: PATHNAME.TRAINING_DRAFt, link: `${ROOT_PATH}/draftedTraining`}
        ]
    },
    {name: PATHNAME.LEARN_TASK, link: `${ROOT_PATH}/taskManagement`, iconName: 'far fa-clone'},
    {name: PATHNAME.LEARN_PROJECT, link: `${ROOT_PATH}/projectManagement`, iconName: 'fas fa-clipboard-list'},
    {
        name: PATHNAME.SETTING,
        iconName: 'fas fa-wrench',
        subItems: [
            {name: PATHNAME.TAG_SETTING, link: `${ROOT_PATH}/tagSetting`},
            {name: PATHNAME.SECURITY_PERMISSION_CATEGORY, link: `${ROOT_PATH}/securityPermissionSetting`},
            {name: PATHNAME.LESSONS_DIRECTION_SETTING, link: `${ROOT_PATH}/lessonsDirectionSetting`},
            {name: PATHNAME.TRAINING_AND_COST, link: `${ROOT_PATH}/trainingCostSetting`},
            {name: PATHNAME.CAROUSEL_SETTING, link: `${ROOT_PATH}/carouselSetting`}
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

        return SIDE_BAR_MENU.filter(item => {
            //先过滤一级菜单
            if (Object.keys(formatPermissions).includes(item.name)) {
                const menu = R.clone(item);
                const allSubMenusUnderFirstMenu = formatPermissions[item.name];
                //过滤二级菜单
                if (menu.subItems) {
                    menu.subItems = menu.subItems.filter(subItem => allSubMenusUnderFirstMenu.includes(subItem.name));
                }
                return menu;
            }
            return false;
        });
    }
    return [];
};

const getLinkByName = (name) => {
    let link;
    const result = SIDE_BAR_MENU.map(item => {
        if (item.link && item.name === name) {
            return item;
        }
        if (item.subItems) {
            return item.subItems.filter(subItem => subItem.name === name)[0] || null;
        }
        return null;
    }).filter(Boolean);

    if (result && result.length) {
        link = result[0].link;
    }
    return link;
};

export {
    ROOT_PATH,
    SIDE_BAR_MENU as sidebarTree,
    getLinkByName,
    renderSideBarWithPermissions
};
