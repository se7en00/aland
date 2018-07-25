import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, reset, submit, Form, Field, SubmissionError, clearSubmitErrors } from 'redux-form';
import { DIALOG, renderOptions } from 'constants';
import { Modal, Button, message} from 'antd';
import { resetSpecificField } from 'utils';
import { connect } from 'react-redux';
import { renderTextField, renderDateTimeField } from '../../shared/form';
import AutoSelectSearch from '../../shared/autoSearch/AutoSelectSearch';
import validate from './validate';

const mapStateToProp = (state) => {
    if (R.isEmpty(state.trainings) || !state.trainings?.lessonDetails) return null;
    const details = state.trainings.lessonDetails;

    return {
        trainingId: details.trainingId,
        lessonId: details.id,
        initialValues: {
            title: details.title,
            enddate: details.enddate ? moment(details.enddate) : '',
            address: details.address
        }
    };
};

@connect(mapStateToProp)
@reduxForm({form: DIALOG.TRAINING_LESSON_DETAILS, enableReinitialize: true, validate})
class LessonEditDialog extends Component {
    static dialogName = DIALOG.TRAINING_LESSON_DETAILS;

    closeDialog = () => {
        this.props.dispatch(clearSubmitErrors(DIALOG.TRAINING_LESSON_DETAILS));
        this.props.dispatch(reset(DIALOG.TRAINING_LESSON_DETAILS));
        this.props.hideDialog(DIALOG.TRAINING_LESSON_DETAILS)();
    }

    createNewLesson= (values) => {
        const {trainingId, lessonId, actions: {updateTrainingLesson}} = this.props;
        const params = Object.keys(values).reduce((map, k) => {
            if (k === 'lecturer') {
                map[k] = values[k].label;
            } else {
                map[k] = values[k];
            }
            return map;
        }, {});
        updateTrainingLesson(trainingId, lessonId, params)
            .then(() => {
                message.success(`更新课时${values.title}成功！`);
                this.closeDialog();
            })
            .catch(error => {
                throw new SubmissionError({
                    _error: error?.errorMessage || `创建课时${values.title}失败！`
                });
            });
    }

    render() {
        const {submitting, handleSubmit, visible, width, dispatch, error} = this.props;
        const restLecturerValue = () => resetSpecificField(dispatch, DIALOG.TRAINING_LESSON_DETAILS, 'lecturer', '');
        const restRangeDateTime = () => resetSpecificField(dispatch, DIALOG.TRAINING_LESSON_DETAILS, 'enddate', '');
        return (
            <Modal
                visible={visible}
                width={width}
                title="编辑课时"
                onCancel={this.closeDialog}
                footer={[
                    <Button key="submit" onClick={() => dispatch(submit(DIALOG.TRAINING_LESSON_DETAILS))} loading={submitting} type="primary">保存</Button>,
                    <Button key="back" onClick={this.closeDialog}>取消</Button>
                ]}
            >
                <Form name="editform" onSubmit={handleSubmit(this.createNewLesson)}>
                    {error && <div className="dialogContainer--error"><strong >{error}</strong></div>}

                    <div className="dialogContainer">

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="title"
                            component={renderTextField}
                            type="text"
                            placeholder="培训标题"
                            label="培训标题"
                        />

                        <AutoSelectSearch
                            api="/api/lecturers"
                            query="name"
                            resetSelectValue={restLecturerValue}
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="lecturer"
                            placeholder="搜索培训讲师"
                            label="培训讲师"
                            renderOptions={renderOptions('id', 'name')}
                        />


                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="enddate"
                            allowClear={true}
                            resetSelectValue={restRangeDateTime}
                            component={renderDateTimeField}
                            label="起止时间"
                        />

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="address"
                            component={renderTextField}
                            type="text"
                            placeholder="培训地址"
                            label="培训地址"
                        />
                    </div>
                </Form>
            </Modal>
        );
    }
}

LessonEditDialog.propTypes = {
    hideDialog: PropTypes.func,
    handleSubmit: PropTypes.func,
    visible: PropTypes.bool,
    submitting: PropTypes.bool,
    actions: PropTypes.objectOf(PropTypes.func),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    trainingId: PropTypes.string,
    lessonId: PropTypes.string,
    dispatch: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

export default LessonEditDialog;
