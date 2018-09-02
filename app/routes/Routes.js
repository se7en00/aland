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
import UserListDetailsView from 'views/userManagement/UserListDetailsView';
import UserGroupView from 'views/userGroup/UserGroupView';
import MaterialsView from 'views/materials/MaterialsView';
import MaterialsEditView from 'views/materials/MaterialsEditView';
import ExamsView from 'views/exams/ExamsView';
import InquiriesView from 'views/inquiry/InquiriesView';
import InquiryAddView from 'views/inquiry/InquiryAddView';
import LecturersView from 'views/lectures/LecturersView';
import LecturesAddView from 'views/lectures/LecturesAddView';
import LecturersDetailView from 'views/lectures/LecturersDetailView';
import ProvidesView from 'views/provides/ProvidesView';
import NoticesView from 'views/notice/NoticesView';
import NoticeAddView from 'views/notice/NoticeAddView';
import NoticeDetailView from 'views/notice/NoticeDetailView';
import NoticeCommentsView from 'views/notice/NoticeCommentsView';
import NoticeSreceiversView from 'views/notice/NoticeSreceiversView';
import NoticeJoinView from 'views/notice/NoticeJoinView';
import NoticeKnowsView from 'views/notice/NoticeKnowsView';
import NoticeLikeView from 'views/notice/NoticeLikeView';
import NewsView from 'views/news/NewsView';
import NewsAddView from 'views/news/NewsAddView';
import NewsDetailView from 'views/news/NewsDetailView';
import TrainingView from 'views/training/TrainingView';
import TrainingCreationView from 'views/training/TrainingCreationView';
import TrainingDetailsView from 'views/training/TrainingDetailsView';
import TaskView from 'views/task/TaskView';
import TaskAddView from 'views/task/TaskAddView';
import TaskDetailsView from 'views/task/TaskDetailsView';
import CourseDirectionView from 'views/setting/CourseDirectionView';
import SecurityView from 'views/setting/SecurityView';
import SummaryView from 'views/summary/SummaryView';
import UserSummaryView from 'views/summary/UserSummaryView';
import PicturesView from 'views/setting/PicturesView';
import TrainingCostView from 'views/setting/TrainingCostView';
import LecturerSettingView from 'views/setting/LecturerSettingView';
import {ConnectedSwitch} from './ConnectedSwitch';
import NoticeInquirysView from 'views/notice/NoticeInquirysView';
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
        <Route exact path={`${match.path}/userManagement/:userId/details`} component={UserListDetailsView}/>
        <Route exact path={`${match.path}/studentManagement`} component={UserGroupView}/>
        <Route exact path={`${match.path}/materials`} component={MaterialsView}/>
        <Route exact path={`${match.path}/materials/additionMaterial`} component={MaterialsEditView}/>
        <Route exact path={`${match.path}/materials/:materialId/detail`} component={MaterialsEditView}/>
        <Route exact path={`${match.path}/questBank`} component={ExamsView}/>
        <Route exact path={`${match.path}/questionnaire`} component={InquiriesView}/>
        <Route exact path={`${match.path}/questionnaire/add`} component={InquiryAddView}/>
        <Route exact path={`${match.path}/questionnaire/:id/detail`} component={InquiryAddView}/>
        <Route exact path={`${match.path}/master`} component={LecturersView}/>
        <Route exact path={`${match.path}/master/add`} component={LecturesAddView}/>
        <Route exact path={`${match.path}/master/:id/detail`} component={LecturersDetailView}/>
        <Route exact path={`${match.path}/master/:id/edit`} component={LecturesAddView}/>
        <Route exact path={`${match.path}/vendor`} component={ProvidesView}/>
        <Route exact path={`${match.path}/tagSetting`} component={TagsView}/>
        <Route exact path={`${match.path}/notesManagement`} component={NoticesView}/>
        <Route exact path={`${match.path}/notesManagement/add`} component={NoticeAddView}/>
        <Route exact path={`${match.path}/notesManagement/:noticeId/detail`} component={NoticeDetailView}/>
        <Route exact path={`${match.path}/notesManagement/:noticeId/comments`} component={NoticeCommentsView}/>
        <Route exact path={`${match.path}/notesManagement/:noticeId/sreceivers`} component={NoticeSreceiversView}/>
        <Route exact path={`${match.path}/notesManagement/:noticeId/sign`} component={NoticeJoinView}/>
        <Route exact path={`${match.path}/notesManagement/:noticeId/know`} component={NoticeKnowsView}/>
        <Route exact path={`${match.path}/notesManagement/:noticeId/like`} component={NoticeLikeView}/>
        <Route exact path={`${match.path}/notesManagement/:noticeId/inquiry`} component={NoticeInquirysView}/>
        <Route exact path={`${match.path}/newsManagement`} component={NewsView}/>
        <Route exact path={`${match.path}/newsManagement/add`} component={NewsAddView}/>
        <Route exact path={`${match.path}/newsManagement/:noticeId/detail`} component={NewsDetailView}/>
        <Route exact path={`${match.path}/publishedTraining`} component={TrainingView}/>
        <Route exact path={`${match.path}/publishedTraining/creation`} component={TrainingCreationView}/>
        <Route exact path={`${match.path}/publishedTraining/:id/details`} component={TrainingDetailsView}/>
        <Route exact path={`${match.path}/taskManagement`} component={TaskView}/>
        <Route exact path={`${match.path}/taskManagement/creation`} component={TaskAddView}/>
        <Route exact path={`${match.path}/taskManagement/:id/details`} component={TaskDetailsView}/>
        <Route exact path={`${match.path}/lessonsDirectionSetting`} component={CourseDirectionView}/>
        <Route exact path={`${match.path}/securityPermissionSetting`} component={SecurityView}/>
        <Route exact path={`${match.path}/summary`} component={SummaryView}/>
        <Route exact path={`${match.path}/userSummary`} component={UserSummaryView}/>
        <Route exact path={`${match.path}/carouselSetting`} component={PicturesView}/>
        <Route exact path={`${match.path}/trainingCostSetting`} component={TrainingCostView}/>
        <Route exact path={`${match.path}/lecturerLevelSetting`} component={LecturerSettingView}/>
    </ConnectedSwitch>
);

Routes.propTypes = {
    match: PropTypes.object
};

export default Routes;
