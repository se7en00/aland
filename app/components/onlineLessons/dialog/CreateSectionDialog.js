import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, submit, Form, Field, clearSubmitErrors, SubmissionError, reset } from 'redux-form';
import { DIALOG } from 'constants';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import { Modal, Button, Select, message} from 'antd';
import { renderTextField, renderSelectField } from '../../shared/form';

@connect(state => ({chapters: state.draftOnlineLesson?.chapters}))
@reduxForm({form: DIALOG.SECTION, enableReinitialize: true})
class CreateSectionDialog extends Component {
    static dialogName = DIALOG.SECTION;

    closeDialog = () => {
        this.props.dispatch(clearSubmitErrors(DIALOG.SECTION));
        this.props.dispatch(reset(DIALOG.CHAPTER));
        this.props.hideDialog(DIALOG.SECTION)();
    }

    createSection = (values) => {
        if (!values.chapterForSection) {
            throw new SubmissionError({chapterForSection: '请至选择一个章名称！'});
        }
        const sections = R.omit(['chapterForSection'], values);
        if (R.isEmpty(sections)) {
            throw new SubmissionError({_error: '请至少输入一个节名称！'});
        }
        this.props.actions.createSections(values.chapterForSection, sections);
        this.props.dispatch(reset(DIALOG.SECTION));
        message.success('创建节成功！');
        this.props.hideDialog(DIALOG.SECTION)();
    }

    render() {
        const Option = Select.Option;
        const {submitting, handleSubmit, visible, width, dispatch, error, invalid, chapters } = this.props;
        return (
            <Modal
                visible={visible}
                width={width}
                title="添加节"
                onCancel={this.closeDialog}
                footer={[
                    <Button key="submit" disabled={invalid} onClick={() => dispatch(submit(DIALOG.SECTION))} loading={submitting} type="primary">保存</Button>,
                    <Button key="back" onClick={this.closeDialog}>取消</Button>
                ]}
            >
                <Form name="editform" onSubmit={handleSubmit(this.createSection)}>
                    {error && <div className="dialogContainer--error"><strong >{error}</strong></div>}

                    <div className="dialogContainer">

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="chapterForSection"
                            component={renderSelectField}
                            placeholder="属于章"
                            label="属于章"
                        >
                            {chapters?.map(item => (<Option key={uuid()} value={item}>{item}</Option>))}
                        </Field>

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="section"
                            component={renderTextField}
                            type="text"
                            placeholder="节名称"
                            label="节名称"
                        />

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="section1"
                            component={renderTextField}
                            type="text"
                            placeholder="节名称"
                            label="节名称"
                        />

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="section2"
                            component={renderTextField}
                            type="text"
                            placeholder="节名称"
                            label="节名称"
                        />

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="section3"
                            component={renderTextField}
                            type="text"
                            placeholder="节名称"
                            label="节名称"
                        />

                    </div>
                </Form>
            </Modal>
        );
    }
}

CreateSectionDialog.propTypes = {
    hideDialog: PropTypes.func,
    handleSubmit: PropTypes.func,
    visible: PropTypes.bool,
    submitting: PropTypes.bool,
    actions: PropTypes.objectOf(PropTypes.func),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    //由于button不在form表单中， 我们采用redux-frorm的remote button，通过redux dispatch方法来来提交表单
    dispatch: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    //redux-form 表单有验证错误为true, 相反为false
    invalid: PropTypes.bool,
    chapters: PropTypes.array
};

export default CreateSectionDialog;
