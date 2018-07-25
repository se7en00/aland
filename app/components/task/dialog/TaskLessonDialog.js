import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form, clearSubmitErrors, reset } from 'redux-form';
import { DIALOG } from 'constants';
import { Modal, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import { renderTextField } from '../../shared/form/index';

const mapStateToProp = (state) => {
    if (R.isEmpty(state.tasks) || !state?.tasks?.taskDetails) return null;
    return {
        taskDetails: state.tasks.taskDetails,
        onlineLessons: state.tasks?.onlineLessons,
        oneClicks: state.tasks?.oneClicks,
        selectedLessons: state.tasks?.selectedLessons
    };
};

@connect(mapStateToProp)
@reduxForm({form: DIALOG.TASK_LESSONS})
class LibExamDialog extends Component {
    static dialogName = DIALOG.TASK_LESSONS;

    closeDialog = () => {
        this.props.dispatch(clearSubmitErrors(DIALOG.TASK_LESSONS));
        this.props.hideDialog(DIALOG.TASK_LESSONS)();
    }

    searchLibExams = (values) => {
        const {actions: {getLibExams}} = this.props;
        getLibExams(values);
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        const {actions: {getSelectedLibExam}} = this.props;
        getSelectedLibExam(selectedRows);
    }

    saveSelectedExams = () => {
        const {taskDetails, selectedLessons, actions: {saveSelectedLibExams}, dispatch, hideDialog} = this.props;
        return saveSelectedLibExams(taskDetails, selectedLessons)
            .then(() => {
                dispatch(clearSubmitErrors(DIALOG.TASK_LESSONS));
                dispatch(reset(DIALOG.TASK_LESSONS));
                hideDialog(DIALOG.TASK_LESSONS)();
            });
    }

    render() {
        const {submitting, handleSubmit, visible, width, error, selectedLessons, onlineLessons, oneClicks} = this.props;
        console.log(onlineLessons);
        console.log(oneClicks);
        return (
            <Modal
                visible={visible}
                width={width}
                title="课件"
                onCancel={this.closeDialog}
                footer={[
                    <Button
                        key="submit"
                        disabled={!selectedLessons || selectedLessons.length === 0}
                        onClick={this.saveSelectedExams}
                        loading={submitting}
                        type="primary"
                    >
                        保存
                    </Button>,
                    <Button key="back" onClick={this.closeDialog}>取消</Button>
                ]}
            >
                <Form name="editform" onSubmit={handleSubmit(this.searchLibExams)}>
                    {error && <div className="dialogContainer--error"><strong >{error}</strong></div>}
                    <div className="row">
                        <Field
                            layout="elementOnly"
                            name="question"
                            rowClassName="col-md-4"
                            component={renderTextField}
                            type="text"
                            prefix={<Icon type="search"/>}
                            placeholder="关键字"
                        />

                        <div className="col-md-2">
                            <Button
                                htmlType="submit"
                                loading={submitting}
                                type="primary">
                                搜索
                            </Button>
                        </div>
                    </div>
                    <div className="row">
                      22
                    </div>
                </Form>
            </Modal>
        );
    }
}

LibExamDialog.propTypes = {
    hideDialog: PropTypes.func,
    handleSubmit: PropTypes.func,
    visible: PropTypes.bool,
    submitting: PropTypes.bool,
    onlineLessons: PropTypes.object,
    oneClicks: PropTypes.object,
    selectedLessons: PropTypes.array,
    actions: PropTypes.objectOf(PropTypes.func),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    dispatch: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    taskDetails: PropTypes.object
};

export default LibExamDialog;
