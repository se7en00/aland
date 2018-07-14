import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import DashboardView from 'views/home/DashboardView';
import OnlineLessonsAddView from 'views/onlineLessons/OnlineLessonsAddView';
import OnlineLessonsView from 'views/onlineLessons/OnlineLessonsView';
import OnlineLessonsPointView from 'views/onlineLessons/OnlineLessonsPointView';
import oneClickView from 'views/oneClick/OneClickView';
import OneClickAddView from 'views/oneClick/OneClickAddView';
import OneClickDetailView from 'views/oneClick/OneClickDetailView';
import AdminListView from 'views/admins/AdminListView';
import TagsView from 'views/tags/TagsView';
import OrgManagementView from 'views/orgManagement/OrgManagementView';
import UserListView from 'views/userManagement/UserListView';
import UserListCreationView from 'views/userManagement/UserListCreationView';
import UserGroupView from 'views/userGroup/UserGroupView';
import MaterialsView from 'views/materials/MaterialsView';
import MaterialsEditView from 'views/materials/MaterialsEditView';
import ExamsView from 'views/exams/ExamsView';
import InquiriesView from 'views/inquiry/InquiriesView';
import LecturersView from 'views/lectures/LecturersView';
import LecturesAddView from 'views/lectures/LecturesAddView';
import LecturersDetailView from 'views/lectures/LecturersDetailView';
import ProvidesView from 'views/provides/ProvidesView';
import {ConnectedSwitch} from './ConnectedSwitch';

const Routes = ({match}) => (
    <ConnectedSwitch>
        <Route exact path={`${match.path}`} component={DashboardView}/>
        <Route exact path={`${match.path}/adminList`} component={AdminListView}/>
        <Route exact path={`${match.path}/onlineLessons`} component={OnlineLessonsView}/>
        <Route exact path={`${match.path}/onlineLessons/:lessonId/details/point/:pointId`} component={OnlineLessonsPointView}/>
        <Route exact path={`${match.path}/onlineLessons/:lessonId/details`} component={OnlineLessonsAddView}/>
        <Route exact path={`${match.path}/onlineLessons/additionLesson`} component={OnlineLessonsAddView}/>
        <Route exact path={`${match.path}/oneClick`} component={oneClickView}/>
        <Route exact path={`${match.path}/oneClick/add`} component={OneClickAddView}/>
        <Route exact path={`${match.path}/oneClick/:id/detail`} component={OneClickDetailView}/>
        <Route exact path={`${match.path}/orgManagement`} component={OrgManagementView}/>
        <Route exact path={`${match.path}/userManagement`} component={UserListView}/>
        <Route exact path={`${match.path}/userManagement/creation`} component={UserListCreationView}/>
        <Route exact path={`${match.path}/studentManagement`} component={UserGroupView}/>
        <Route exact path={`${match.path}/materials`} component={MaterialsView}/>
        <Route exact path={`${match.path}/materials/additionMaterial`} component={MaterialsEditView}/>
        <Route exact path={`${match.path}/materials/:materialId/detail`} component={MaterialsEditView}/>
        <Route exact path={`${match.path}/questBank`} component={ExamsView}/>
        <Route exact path={`${match.path}/questionnaire`} component={InquiriesView}/>
        <Route exact path={`${match.path}/master`} component={LecturersView}/>
        <Route exact path={`${match.path}/master/add`} component={LecturesAddView}/>
        <Route exact path={`${match.path}/master/:id/detail`} component={LecturersDetailView}/>
        <Route exact path={`${match.path}/master/:id/edit`} component={LecturesAddView}/>
        <Route exact path={`${match.path}/vendor`} component={ProvidesView}/>
        <Route exact path={`${match.path}/tagSetting`} component={TagsView}/>
    </ConnectedSwitch>
);

Routes.propTypes = {
    match: PropTypes.object
};

export default Routes;
