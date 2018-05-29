// import {PATHNAME} from './Constants';
import sidebarList from './sidebarTree';

const getAllLinksMap = list => list.reduce((result, item) => {
    if (!item.subItems) {
        result[item.link] = item.name;
        return result;
    }
    item.subItems.forEach(subItem => {result[subItem.link] = subItem.name;});
    return result;
}, {});

let breadcrumbNameMap = {
    '/apps/1': 'Application1',
    '/apps/2': 'Application2',
    '/apps/1/detail': 'Detail',
    '/apps/2/detail': 'Detail'
};

breadcrumbNameMap = Object.assign(breadcrumbNameMap, getAllLinksMap(sidebarList));

export {breadcrumbNameMap};

