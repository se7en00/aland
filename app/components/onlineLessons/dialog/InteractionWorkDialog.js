import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, message } from 'antd';
import { Form, Field, reduxForm, submit, reset, clearSubmitErrors, SubmissionError } from 'redux-form';
import { DIALOG, renderOptions} from 'constants';
import { resetSpecificField } from 'utils';
import { connect } from 'react-redux';
import { renderTextField } from '../../shared/form';
import AutoSelectSearch from '../../shared/autoSearch/AutoSelectSearch';
import validate from './interactionValidate';


const mapStateToProps = (state) => {
    if (R.isEmpty(state.point) || !state?.point?.editHomeWork) return null;
    const { courseId, pointId } = state?.point?.pointContent;
    const { editHomeWork } = state?.point;
    return {
        workId: editHomeWork.workId,
        courseId,
        pointId,
        initialValues: {
            term: editHomeWork?.term,
            content1: editHomeWork?.content1,
            content2: editHomeWork?.content2,
            users: editHomeWork?.users
        }
    };
};

@connect(mapStateToProps)
@reduxForm({form: DIALOG.INTERACTION_WORK, enableReinitialize: true, validate})
class InteractionWorkDialog extends Component {
    static dialogName = DIALOG.INTERACTION_WORK;

    closeDialog = () => {
        this.props.dispatch(clearSubmitErrors(DIALOG.INTERACTION_WORK));
        this.props.dispatch(reset(DIALOG.INTERACTION_WORK));
        this.props.hideDialog(DIALOG.INTERACTION_WORK)();
    }

    submit = (values) => {
        const {workId, courseId, pointId, actions: {saveInteractionHomeWork}} = this.props;
        const params = {
            courseContentId: pointId,
            type: 'INTERACTION',
            content1: values.content1,
            content2: values.content2,
            term: values.term,
            targetIds: values.users.map(user => user.key)
        };
        return saveInteractionHomeWork(courseId, pointId, workId, params)
            .then(() => {
                message.success('保存课内作业（人际互动）成功！');
                this.closeDialog();
            })
            .catch(error => {
                throw new SubmissionError({
                    _error: error?.errorMessage || '保存课内作业（人际互动）失败'
                });
            });
    }

    render() {
        const {submitting, handleSubmit, visible, width, dispatch, error } = this.props;
        const resetPersonValue = () => resetSpecificField(dispatch, DIALOG.INTERACTION_WORK, 'users', '');
        const marginLeft = {marginLeft: '1px'};
        return (
            <Modal
                visible={visible}
                width={width}
                title="人际交互"
                onCancel={this.closeDialog}
                footer={[
                    <Button key="submit" onClick={() => dispatch(submit(DIALOG.INTERACTION_WORK))} loading={submitting} type="primary">保存</Button>,
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
                            name="content1"
                            rows="3"
                            component={renderTextField}
                            type="textarea"
                            label="人际互动做什么"
                        />

                        <Field
                            layout="vertical"
                            labelClassName="col-md-2"
                            className="col-md-12"
                            rowClassName="dialogContainer__inputRow"
                            name="content2"
                            rows="3"
                            component={renderTextField}
                            type="textarea"
                            label="为什么要这么做"
                        />

                        <AutoSelectSearch
                            api="/api/users"
                            query="name"
                            mode="multiple"
                            style={marginLeft}
                            resetSelectValue={resetPersonValue}
                            labelClassName="col-md-3"
                            className="col-md-8 col-lg-6"
                            rowClassName="inputRow"
                            name="users"
                            placeholder="互动学员"
                            label="互动学员"
                            renderOptions={renderOptions('id', 'name')}
                        />

                        <Field
                            style={marginLeft}
                            labelClassName="col-md-3"
                            className="col-md-8 col-lg-6"
                            rowClassName="inputRow"
                            name="term"
                            component={renderTextField}
                            type="text"
                            placeholder="天数"
                            label="互动完成时间范围"
                        />
                    </div>
                </Form>
            </Modal>
        );
    }
}

InteractionWorkDialog.propTypes = {
    //隐藏弹出框
    hideDialog: PropTypes.func,
    //提交表单，由redux-form传入
    handleSubmit: PropTypes.func,
    //异步方法，在父层注入dialog时，由Dialog高阶组件取的，并传入每个dialog
    actions: PropTypes.objectOf(PropTypes.func),
    //由于button不在form表单中， 我们采用redux-frorm的remote button，通过redux dispatch方法来来提交表单
    dispatch: PropTypes.func,
    //弹出框显示 ，隐藏flag
    visible: PropTypes.bool,
    //错误信息，可以是同步和异步验证的错误信息，也是submit返回的错误信息
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    //redux-form 表单有验证错误为true, 相反为false
    //表单是否提交
    submitting: PropTypes.bool,
    //弹出框的宽度
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    workId: PropTypes.string,
    courseId: PropTypes.string,
    pointId: PropTypes.string
};

export default InteractionWorkDialog;
