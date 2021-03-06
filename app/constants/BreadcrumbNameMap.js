import {renderSideBarWithPermissions} from './sidebarTree';

const getAllLinksMap = list => list?.reduce((result, item) => {
    if (!item.subItems) {
        result[item.link] = item.name;
        return result;
    }
    item.subItems.forEach(subItem => {result[subItem.link] = subItem.name;});
    return result;
}, {});

let breadcrumbNameMap = {
    '/aland/onlineLessons/additionLesson': '新建线上课程',
    '/aland/onlineLessons/:lessonId/details/point/:pointId': '点内容',
    '/aland/onlineLessons/:lessonId/details': '课程内容',
    '/aland/oneClick/add': '新建一点通',
    '/aland/userManagement/creation': '新建人员',
    '/aland/userManagement/:id/details': '人员信息详情',
    '/aland/publishedTraining/creation': '新建培训内容',
    '/aland/publishedTraining/:id/details': '培训内容',
    '/aland/taskManagement/creation': '新建学习任务',
    '/aland/taskManagement/:id/details': '学习任务内容'
    // '/apps/1': 'Application1',
    // '/apps/2': 'Application2',
    // '/apps/1/detail': 'Detail',
    // '/apps/2/detail': 'Detail'
};

const allData = renderSideBarWithPermissions();
breadcrumbNameMap = Object.assign(breadcrumbNameMap, getAllLinksMap(allData));

export {breadcrumbNameMap};

