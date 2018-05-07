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
            {name: PATHNAME.SYSTEM_MANAGEMENT, link: '/studentManagement'}
        ]
    },
    {
        name: PATHNAME.NEWS_MANAGEMENT,
        iconName: 'fas fa-newspaper',
        subItems: [
            {name: PATHNAME.NEWS_MANAGEMENT, link: '/newsManagement'},
            {name: PATHNAME.NOTES_MANAGEMENT, link: '/notesManagement'}
        ]
    },
    {
        name: PATHNAME.RESOURCE_MANAGEMENT,
        iconName: 'fas fa-cloud',
        subItems: [
            {name: PATHNAME.ONLINE_LESSONS, link: '/onlineLessons'},
            {name: PATHNAME.KNOWLEDGE, link: '/knowledge'},
            {name: PATHNAME.SINGLE_LESSONS, link: '/singleLessons'},
            {name: PATHNAME.MATERIALS, link: '/materials'},
            {name: PATHNAME.QUEST_BANK, link: '/questBank'},
            {name: PATHNAME.QUESTIONNAIRE_BANK, link: '/questionnaire'},
            {name: PATHNAME.MASTER, link: '/master'},
            {name: PATHNAME.VENDOR, link: '/vendor'}
        ]
    },
    {
        name: PATHNAME.TRAINING,
        subItems: [
            {name: PATHNAME.TRAINING, link: '/training'}
        ]
    },
    {name: PATHNAME.LEARN_TASK, link: '/test', iconName: 'fas fa-tasks'}
];

export default SIDE_BAR_MENU;
