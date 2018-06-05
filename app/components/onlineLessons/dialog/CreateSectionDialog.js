import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, submit, Form, Field } from 'redux-form';
import { DIALOG } from 'constants';
import { Modal, Button, Select} from 'antd';
import { renderTextField, renderSelectField } from '../../shared/form';

@reduxForm({form: DIALOG.SECTION})
class CreateSectionDialog extends Component {
    static dialogName = DIALOG.SECTION;

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.visible) {
    //         this.props.actions.resetForm(DIALOG.CHAPTER);
    //         this.setState({ current: 0 });
    //     }
    // }


    render() {
        const Option = Select.Option;
        const {submitting, handleSubmit, visible, hideDialog, width, dispatch, error, invalid } = this.props;
        return (
            <Modal
                visible={visible}
                width={width}
                title="添加节"
                onCancel={hideDialog(DIALOG.SECTION)}
                footer={[
                    <Button key="submit" disabled={invalid} onClick={() => dispatch(submit(DIALOG.SECTION))} loading={submitting} type="primary">保存</Button>,
                    <Button key="back" onClick={hideDialog(DIALOG.SECTION)}>取消</Button>
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
                            component={renderSelectField}
                            placeholder="属于章"
                            label="属于章"
                        >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
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
                            name="section"
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
    // actions: PropTypes.objectOf(PropTypes.func)
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    //由于button不在form表单中， 我们采用redux-frorm的remote button，通过redux dispatch方法来来提交表单
    dispatch: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    //redux-form 表单有验证错误为true, 相反为false
    invalid: PropTypes.bool
};

export default CreateSectionDialog;
