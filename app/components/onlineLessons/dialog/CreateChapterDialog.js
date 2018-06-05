import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, submit, Form, Field } from 'redux-form';
import { DIALOG } from 'constants';
import { Modal, Button} from 'antd';
import { renderTextField } from '../../shared/form';

@reduxForm({form: DIALOG.CHAPTER})
class CreateChapterDialog extends Component {
    static dialogName = DIALOG.CHAPTER;

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.visible) {
    //         this.props.actions.resetForm(DIALOG.CHAPTER);
    //         this.setState({ current: 0 });
    //     }
    // }


    render() {
        const {submitting, handleSubmit, visible, hideDialog, width, dispatch, error, invalid } = this.props;
        return (
            <Modal
                visible={visible}
                width={width}
                title="添加章"
                onCancel={hideDialog(DIALOG.CHAPTER)}
                footer={[
                    <Button key="submit" disabled={invalid} onClick={() => dispatch(submit(DIALOG.CHAPTER))} loading={submitting} type="primary">保存</Button>,
                    <Button key="back" onClick={hideDialog(DIALOG.CHAPTER)}>取消</Button>
                ]}
            >
                <Form name="editform" onSubmit={handleSubmit}>
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
    // actions: PropTypes.objectOf(PropTypes.func)
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    //由于button不在form表单中， 我们采用redux-frorm的remote button，通过redux dispatch方法来来提交表单
    dispatch: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    //redux-form 表单有验证错误为true, 相反为false
    invalid: PropTypes.bool
};

export default CreateChapterDialog;
