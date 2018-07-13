import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm} from 'redux-form';
import { DIALOG } from 'constants';
import { Modal, Button } from 'antd';
import { connect } from 'react-redux';
import ExamDetailsDialogTable from './ExamDetailsDialogTable';
import QuestionDetails from './QuestionDetails';

const mapStateToProp = (state) => {
    if (R.isEmpty(state.point)) return null;
    return {
        userList: state.draftOnlineLesson?.userList,
        questionDetails: state.draftOnlineLesson?.questionDetails
    };
};

@connect(mapStateToProp)
@reduxForm({form: DIALOG.COURSE_EXAM_DETAILS})
class ExamDetailsDialogForCourse extends Component {
    static dialogName = DIALOG.COURSE_EXAM_DETAILS;

    closeDialog = () => {
        this.props.hideDialog(DIALOG.COURSE_EXAM_DETAILS)();
    }

    render() {
        const {visible, questionDetails, userList} = this.props;
        return (
            <Modal
                visible={visible}
                width="900px"
                title="测试题详情"
                onCancel={this.closeDialog}
                footer={[
                    <Button key="back" onClick={this.closeDialog}>取消</Button>
                ]}
            >
                <QuestionDetails dataSource={questionDetails}/>
                <ExamDetailsDialogTable dataSource={userList}/>
            </Modal>
        );
    }
}

ExamDetailsDialogForCourse.propTypes = {
    hideDialog: PropTypes.func,
    visible: PropTypes.bool,
    userList: PropTypes.object,
    questionDetails: PropTypes.object
};

export default ExamDetailsDialogForCourse;
