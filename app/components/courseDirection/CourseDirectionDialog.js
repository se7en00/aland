import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form, clearSubmitErrors, reset, submit } from 'redux-form';
import { DIALOG } from 'constants';
import { Modal, Button } from 'antd';
// import { connect } from 'react-redux';
import { renderTextField } from '../shared/form';

const required = value => (value ? undefined : '不能为空！');

@reduxForm({form: DIALOG.COURSE_DIRECTION})
class CourseDirectionDialog extends Component {
    static dialogName = DIALOG.COURSE_DIRECTION;

    closeDialog = () => {
        this.props.dispatch(clearSubmitErrors(DIALOG.COURSE_DIRECTION));
        this.props.dispatch(reset(DIALOG.COURSE_DIRECTION));
        this.props.hideDialog(DIALOG.COURSE_DIRECTION)();
    }

    submit= (values) => {
       console.log(22);
    }

    render() {
        const {submitting, handleSubmit, visible, width, error, dispatch} = this.props;
        return (
            <Modal
                visible={visible}
                width={width}
                title="新增"
                onCancel={this.closeDialog}
                footer={[
                    <Button key="submit" onClick={() => dispatch(submit(DIALOG.COURSE_DIRECTION))} loading={submitting} type="primary">保存</Button>,
                    <Button key="back" onClick={this.closeDialog}>取消</Button>
                ]}
            >
                <Form onSubmit={handleSubmit(this.submit)}>
                    {error && <div className="dialogContainer--error"><strong >{error}</strong></div>}

                    <div className="dialogContainer">
                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="title"
                            component={renderTextField}
                            type="text"
                            placeholder="一级种类名称"
                            label="一级种类名称"
                            validate={required}
                        />

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="title"
                            component={renderTextField}
                            type="text"
                            placeholder="二级种类名称"
                            label="二级种类名称"
                            validate={required}
                        />

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="title"
                            component={renderTextField}
                            type="text"
                            placeholder="二级种类名称"
                            label="二级种类名称"
                            validate={required}
                        />

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="title"
                            component={renderTextField}
                            type="text"
                            placeholder="二级种类名称"
                            label="二级种类名称"
                            validate={required}
                        />


                    </div>
                </Form>
            </Modal>
        );
    }
}

CourseDirectionDialog.propTypes = {
    hideDialog: PropTypes.func,
    handleSubmit: PropTypes.func,
    visible: PropTypes.bool,
    submitting: PropTypes.bool,
    // actions: PropTypes.objectOf(PropTypes.func),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    dispatch: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

export default CourseDirectionDialog;
