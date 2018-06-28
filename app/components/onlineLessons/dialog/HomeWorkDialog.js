import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, message } from 'antd';
import { Form, Field, reduxForm, submit, SubmissionError, reset, clearSubmitErrors } from 'redux-form';
import { DIALOG, TYPE_MAPPING } from 'constants';
import { connect } from 'react-redux';
import { renderTextField } from '../../shared/form';

const required = value => (value ? undefined : '不能为空！');
const mapStateToProps = (state) => {
    if (R.isEmpty(state.point) || !state?.point?.editHomeWork) return null;
    const {courseId, pointId } = state?.point?.pointContent;
    const {type, content1, workId} = state?.point?.editHomeWork;
    return {
        workId,
        courseId,
        pointId,
        type,
        initialValues: {content: content1}
    };
};

@connect(mapStateToProps)
@reduxForm({form: DIALOG.HOME_WORK, enableReinitialize: true})
class HomeWorkDialog extends Component {
    static dialogName = DIALOG.HOME_WORK;

    closeDialog = () => {
        this.props.dispatch(clearSubmitErrors(DIALOG.HOME_WORK));
        this.props.dispatch(reset(DIALOG.HOME_WORK));
        this.props.hideDialog(DIALOG.HOME_WORK)();
    }

    submit = (values) => {
        const {workId, courseId, pointId, type, actions: {saveHomeWork}} = this.props;
        return saveHomeWork(courseId, pointId, workId, type, values.content)
            .then(() => {
                message.success(`保存课内作业(${TYPE_MAPPING[type]})成功！`);
                this.closeDialog();
            })
            .catch(error => {
                throw new SubmissionError({
                    _error: error?.errorMessage || '保存课内作业失败'
                });
            });
    }

    render() {
        const {submitting, handleSubmit, visible, width, dispatch, error, invalid, title } = this.props;
        const label = title === '文字写作' ? '请详细的叙述写作要和规范' : '详细的描述动手作业的过程和要求';
        return (
            <Modal
                visible={visible}
                width={width}
                title={title}
                onCancel={this.closeDialog}
                footer={[
                    <Button key="submit" disabled={invalid} onClick={() => dispatch(submit(DIALOG.HOME_WORK))} loading={submitting} type="primary">保存</Button>,
                    <Button key="back" onClick={this.closeDialog}>取消</Button>
                ]}
            >
                <Form onSubmit={handleSubmit(this.submit)}>
                    {error && <div className="dialogContainer--error"><strong >{error}</strong></div>}

                    <div className="dialogContainer">
                        <Field
                            layout="vertical"
                            labelClassName="col-md-2"
                            className="col-md-12"
                            rowClassName="dialogContainer__inputRow"
                            name="content"
                            rows="5"
                            component={renderTextField}
                            type="textarea"
                            label={label}
                            validate={required}
                        />
                    </div>
                </Form>
            </Modal>
        );
    }
}

HomeWorkDialog.propTypes = {
    hideDialog: PropTypes.func,
    handleSubmit: PropTypes.func,
    dispatch: PropTypes.func,
    visible: PropTypes.bool,
    actions: PropTypes.objectOf(PropTypes.func),
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    title: PropTypes.string,
    workId: PropTypes.string,
    courseId: PropTypes.string,
    pointId: PropTypes.string,
    type: PropTypes.string
};

export default HomeWorkDialog;
