import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm} from 'redux-form';
import { DIALOG } from 'constants';
import { Modal, Button } from 'antd';
import { connect } from 'react-redux';
import ExamDetailsDialogTable from './ExamDetailsDialogTable';
import QuestionDetails from './QuestionDetails';

const mapStateToProp = (state) => {
    if (R.isEmpty(state.trainings)) return null;
    return {
        userList: state.trainings?.userList,
        questionDetails: state.trainings?.questionDetails
    };
};

@connect(mapStateToProp)
@reduxForm({form: DIALOG.TRAINING_EXAM_DETAILS})
class ExamDetailsDialog extends Component {
    static dialogName = DIALOG.TRAINING_EXAM_DETAILS;

    closeDialog = () => {
        this.props.hideDialog(DIALOG.TRAINING_EXAM_DETAILS)();
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

ExamDetailsDialog.propTypes = {
    hideDialog: PropTypes.func,
    visible: PropTypes.bool,
    userList: PropTypes.object,
    questionDetails: PropTypes.object
};

export default ExamDetailsDialog;
