import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm} from 'redux-form';
import { DIALOG } from 'constants';
import { Modal, Button } from 'antd';
import { connect } from 'react-redux';
// import ExamDetailsDialogTable from './ExamDetailsDialogTable';
import QuestionDetails from './QuestionDetails';

const mapStateToProp = (state) => {
    if (R.isEmpty(state.point) || !state?.point?.pointContent) return null;
    const {pointId } = state?.point?.pointContent;
    return {
        pointId,
        userList: state.point?.userList,
        questionDetails: state.point?.questionDetails
    };
};

@connect(mapStateToProp)
@reduxForm({form: DIALOG.EXAM_DETAILS})
class ExamDetailsDialog extends Component {
    static dialogName = DIALOG.EXAM_DETAILS;

    closeDialog = () => {
        this.props.hideDialog(DIALOG.EXAM_DETAILS)();
    }

    render() {
        const {visible, questionDetails} = this.props;
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
            </Modal>
        );
    }
}

ExamDetailsDialog.propTypes = {
    hideDialog: PropTypes.func,
    visible: PropTypes.bool,
    // userList: PropTypes.object,
    questionDetails: PropTypes.object
};

export default ExamDetailsDialog;
