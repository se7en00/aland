import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form, clearSubmitErrors, reset } from 'redux-form';
import { DIALOG } from 'constants';
import { Modal, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import LibExamDialogTable from './LibExamDialogTable';
import { renderTextField } from '../../../shared/form/index';

const mapStateToProp = (state) => {
    if (R.isEmpty(state.trainings) || !state?.trainings?.trainingDetails) return null;
    return {
        trainingId: state.trainings.trainingDetails.id,
        libExams: state.trainings?.libExams,
        selectedLibExams: state.trainings?.selectedLibExams
    };
};

@connect(mapStateToProp)
@reduxForm({form: DIALOG.TRAINING_LIB_EXAM})
class LibExamDialog extends Component {
    static dialogName = DIALOG.TRAINING_LIB_EXAM;

    closeDialog = () => {
        this.props.dispatch(clearSubmitErrors(DIALOG.TRAINING_LIB_EXAM));
        this.props.hideDialog(DIALOG.TRAINING_LIB_EXAM)();
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
        const {trainingId, selectedLibExams, actions: {saveSelectedLibExams}, dispatch, hideDialog} = this.props;
        return saveSelectedLibExams(trainingId, selectedLibExams)
            .then(() => {
                dispatch(clearSubmitErrors(DIALOG.TRAINING_LIB_EXAM));
                dispatch(reset(DIALOG.TRAINING_LIB_EXAM));
                hideDialog(DIALOG.TRAINING_LIB_EXAM)();
            });
    }

    render() {
        const {submitting, handleSubmit, visible, width, error, libExams, selectedLibExams} = this.props;
        return (
            <Modal
                visible={visible}
                width={width}
                title="试题库"
                onCancel={this.closeDialog}
                footer={[
                    <Button
                        key="submit"
                        disabled={!selectedLibExams || selectedLibExams.length === 0}
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
                        <LibExamDialogTable onChange={this.onSelectChange} dataSource={libExams?.elements}/>
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
    libExams: PropTypes.object,
    selectedLibExams: PropTypes.array,
    actions: PropTypes.objectOf(PropTypes.func),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    dispatch: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    trainingId: PropTypes.string
};

export default LibExamDialog;
