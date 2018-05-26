export const IDENTIFIERS = {
    ACCORDION: 'accordion',
    ACCORDION_ITEM: 'accordion_item',
    ACCORDION_TITLE: 'accordion_title',
    ACCORDION_CONTENT: 'accordion_content'
};

export const PATHNAME = {
    INDEX: '首页',
    SYSTEM_MANAGEMENT: '系统管理',
    ACCOUNT_MANAGEMENT: '账户管理',
    ORG: '组织架构',
    USER_MANAGEMENT: '人员管理',
    STUDENT_MANAGEMENT: '学员群组管理',
    NEWS_MANAGEMENT: '新闻管理',
    NOTES_MANAGEMENT: '通知管理',
    RESOURCE_MANAGEMENT: '资源管理',
    ONLINE_LESSONS: '线上课程库管理',
    KNOWLEDGE: '知识点库管理',
    SINGLE_LESSONS: '一点课库管理',
    MATERIALS: '素材管理',
    QUEST_BANK: '题库管理',
    QUESTIONNAIRE_BANK: '问卷库管理',
    MASTER: '内训师管理',
    VENDOR: '供应商管理',
    TRAINING: '培训管理',
    LEARN_TASK: '学习任务管理'
};

export const DIALOG = {
    FIND_PASSWORD: 'findPassword',
    CREATE_USER: 'createUser',
    EDIT_USER: 'editUser'
};

export const PANEL_TITLE = {
    ACCOUNT: '账户列表'
};

export const BASE_URL = 'http://139.224.113.208:8181/aland-training';
export const URL = {
    LOGIN: {
        INFO: '/api/users/login',
        FIND_PASSWORD: '/api/users/findPassword'
    },
    USER: {
        LIST: '/api/users',
        CREATE_USER: '/api/users',
        UPDATE_UER: id => `/api/users/${id}`
    }
};

