import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, reset, submit, Form, Field, SubmissionError, clearSubmitErrors } from 'redux-form';
import { DIALOG } from 'constants';
import { Modal, Button, message} from 'antd';
import { renderTextField } from '../../shared/form';

@reduxForm({form: DIALOG.CHAPTER})
class CreateChapterDialog extends Component {
    static dialogName = DIALOG.CHAPTER;

    createChapter = (values) => {
        if (R.isEmpty(values)) {
            throw new SubmissionError({_error: '请至少输入一个章名称！'});
        }
        const {draftLesson, dispatch, hideDialog, actions: {createChapters}} = this.props;
        //创建章
        createChapters(draftLesson?.id, values)
            .then(() => {
                dispatch(reset(DIALOG.CHAPTER));
                message.success('创建章成功！');
                hideDialog(DIALOG.CHAPTER)();
            })
            .catch(error => {
                throw new SubmissionError({
                    _error: error?.errorMessage || '创建章失败'
                });
            });
    }

    closeDialog = () => {
        this.props.dispatch(clearSubmitErrors(DIALOG.CHAPTER));
        this.props.hideDialog(DIALOG.CHAPTER)();
    }

    render() {
        const {submitting, handleSubmit, visible, width, dispatch, error} = this.props;
        return (
            <Modal
                visible={visible}
                width={width}
                title="添加章"
                onCancel={this.closeDialog}
                footer={[
                    <Button key="submit" onClick={() => dispatch(submit(DIALOG.CHAPTER))} loading={submitting} type="primary">保存</Button>,
                    <Button key="back" onClick={this.closeDialog}>取消</Button>
                ]}
            >
                <Form name="editform" onSubmit={handleSubmit(this.createChapter)}>
                    {error && <div className="dialogContainer--error"><strong >{error}</strong></div>}

                    <div className="dialogContainer">

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="chapter"
                            component={renderTextField}
                            type="text"
                            placeholder="章名称"
                            label="章名称"
                        />

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="chapter1"
                            component={renderTextField}
                            type="text"
                            placeholder="章名称"
                            label="章名称"
                        />

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="chapter2"
                            component={renderTextField}
                            type="text"
                            placeholder="章名称"
                            label="章名称"
                        />

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="chapter3"
                            component={renderTextField}
                            type="text"
                            placeholder="章名称"
                            label="章名称"
                        />

                    </div>
                </Form>
            </Modal>
        );
    }
}

CreateChapterDialog.propTypes = {
    hideDialog: PropTypes.func,
    handleSubmit: PropTypes.func,
    visible: PropTypes.bool,
    submitting: PropTypes.bool,
    actions: PropTypes.objectOf(PropTypes.func),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    draftLesson: PropTypes.object,
    dispatch: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
    //redux-form 表单有验证错误为true, 相反为false
};

export default CreateChapterDialog;
