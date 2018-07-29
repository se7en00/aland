import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, reset, submit, Form, Field, SubmissionError, clearSubmitErrors } from 'redux-form';
import { DIALOG, renderOptions } from 'constants';
import { Modal, Button, message} from 'antd';
import { resetSpecificField } from 'utils';
import { connect } from 'react-redux';
import { renderTextField, renderDateRangeField } from '../../shared/form';
import AutoSelectSearch from '../../shared/autoSearch/AutoSelectSearch';
import validate from './validate';

const mapStateToProp = (state) => {
    if (R.isEmpty(state.trainings) || !state.trainings?.trainingDetails) return null;
    const {id: trainingId} = state.trainings.trainingDetails;
    return {
        trainingId
    };
};

@connect(mapStateToProp)
@reduxForm({form: DIALOG.TRAINING_LESSON, validate})
class LessonDialog extends Component {
    static dialogName = DIALOG.TRAINING_LESSON;

    closeDialog = () => {
        this.props.dispatch(clearSubmitErrors(DIALOG.TRAINING_LESSON));
        this.props.dispatch(reset(DIALOG.TRAINING_LESSON));
        this.props.hideDialog(DIALOG.TRAINING_LESSON)();
    }

    createNewLesson= (values) => {
        const {trainingId, actions: {saveTrainingLesson}} = this.props;
        const params = Object.keys(values).reduce((map, k) => {
            if (k === 'lecturer') {
                map[k] = values[k].label;
            } else if (k === 'limitTime') {
                map.startDate = moment(values[k][0]).valueOf();
                map.endDate = moment(values[k][1]).valueOf();
            } else {
                map[k] = values[k];
            }
            return map;
        }, {});
        saveTrainingLesson(trainingId, params)
            .then(() => {
                message.success(`创建课时${values.title}成功！`);
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
        const restLecturerValue = () => resetSpecificField(dispatch, DIALOG.TRAINING_LESSON, 'lecturer', '');
        const restRangeDateTime = () => resetSpecificField(dispatch, DIALOG.TRAINING_LESSON, 'limitTime', '');
        return (
            <Modal
                visible={visible}
                width={width}
                title="添加课时"
                onCancel={this.closeDialog}
                footer={[
                    <Button key="submit" onClick={() => dispatch(submit(DIALOG.TRAINING_LESSON))} loading={submitting} type="primary">保存</Button>,
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
                            name="limitTime"
                            allowClear={true}
                            resetSelectValue={restRangeDateTime}
                            component={renderDateRangeField}
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

LessonDialog.propTypes = {
    hideDialog: PropTypes.func,
    handleSubmit: PropTypes.func,
    visible: PropTypes.bool,
    submitting: PropTypes.bool,
    actions: PropTypes.objectOf(PropTypes.func),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    trainingId: PropTypes.string,
    dispatch: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
    //redux-form 表单有验证错误为true, 相反为false
};

export default LessonDialog;
