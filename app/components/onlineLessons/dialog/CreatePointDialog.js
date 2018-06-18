import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, submit, Form, Field, clearSubmitErrors, reset, SubmissionError } from 'redux-form';
import { DIALOG, renderOptions } from 'constants';
import { Modal, Button, message } from 'antd';
import { connect } from 'react-redux';
import { renderTextField, renderSelectField } from '../../shared/form';

const mapStateToProps = (state) => ({
    draftLesson: state.draftOnlineLesson?.draftLesson,
    chapters: state.draftOnlineLesson?.chapters,
    sections: state.draftOnlineLesson?.sections
});

@connect(mapStateToProps)
@reduxForm({form: DIALOG.POINT})
class CreatePointDialog extends Component {
    static dialogName = DIALOG.POINT;

    state = {sectionsOptions: []};

    closeDialog = () => {
        this.props.dispatch(clearSubmitErrors(DIALOG.POINT));
        this.props.dispatch(reset(DIALOG.POINT));
        this.props.hideDialog(DIALOG.POINT)();
    }

    createPoint = (values) => {
        if (!values.chapterForPoint) {
            throw new SubmissionError({chapterForPoint: '请至选择一个章名称！'});
        }
        if (!values.sectionForPoint) {
            throw new SubmissionError({sectionForPoint: '请至选择一个节名称！'});
        }
        const points = R.omit(['chapterForPoint', 'sectionForPoint'], values);
        if (R.isEmpty(points)) {
            throw new SubmissionError({_error: '请至少输入一个点名称！'});
        }
        const {draftLesson, dispatch, hideDialog, actions: {createPoint}} = this.props;
        createPoint(draftLesson?.id, values.sectionForPoint, points)
            .then(() => {
                dispatch(reset(DIALOG.POINT));
                message.success('创建点成功！');
                hideDialog(DIALOG.POINT)();
            })
            .catch(error => {
                throw new SubmissionError({
                    _error: error?.errorMessage || '创建点失败'
                });
            });
    }

    onSelect = (value) => {
        const {sections} = this.props;
        this.setState({sectionsOptions: sections[value]});
    }

    render() {
        const {sectionsOptions} = this.state;
        const {submitting, handleSubmit, visible, width, dispatch, error, chapters} = this.props;
        return (
            <Modal
                visible={visible}
                width={width}
                title="添加点"
                onCancel={this.closeDialog}
                footer={[
                    <Button key="submit" onClick={() => dispatch(submit(DIALOG.POINT))} loading={submitting} type="primary">保存</Button>,
                    <Button key="back" onClick={this.closeDialog}>取消</Button>
                ]}
            >
                <Form name="editform" onSubmit={handleSubmit(this.createPoint)}>
                    {error && <div className="dialogContainer--error"><strong >{error}</strong></div>}

                    <div className="dialogContainer">

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="chapterForPoint"
                            component={renderSelectField}
                            onSelect={this.onSelect}
                            placeholder="属于章"
                            label="属于章"
                        >
                            {renderOptions('id', 'subject')(chapters)}
                        </Field>

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="sectionForPoint"
                            component={renderSelectField}
                            placeholder="属于节"
                            label="属于节"
                        >
                            {renderOptions('id', 'subject')(sectionsOptions)}
                        </Field>

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="point"
                            component={renderTextField}
                            type="text"
                            placeholder="点名称"
                            label="点名称"
                        />

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="point1"
                            component={renderTextField}
                            type="text"
                            placeholder="点名称"
                            label="点名称"
                        />

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="point2"
                            component={renderTextField}
                            type="text"
                            placeholder="点名称"
                            label="点名称"
                        />

                    </div>
                </Form>
            </Modal>
        );
    }
}

CreatePointDialog.propTypes = {
    hideDialog: PropTypes.func,
    handleSubmit: PropTypes.func,
    visible: PropTypes.bool,
    submitting: PropTypes.bool,
    actions: PropTypes.objectOf(PropTypes.func),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    //由于button不在form表单中， 我们采用redux-frorm的remote button，通过redux dispatch方法来来提交表单
    dispatch: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    chapters: PropTypes.array,
    sections: PropTypes.object,
    draftLesson: PropTypes.object
};

export default CreatePointDialog;
