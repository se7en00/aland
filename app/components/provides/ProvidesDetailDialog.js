import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DIALOG, renderOptions } from 'constants';
import { Button, Modal, message } from 'antd';
import {Form, Field, reduxForm, submit} from 'redux-form';
import {connect} from 'react-redux';
import { renderSelectField, renderTextField } from '../shared/form/index';

const required = value => (value ? undefined : '不能为空！');
const mapStateToProps = (state) => {
    const {provide = {}, categoryList = [] } = state?.provides;
    return {
        provide,
        categoryList,
        initialValues: provide
    };
};
@connect(mapStateToProps)
@reduxForm({
    form: DIALOG.PROVIDE_DETAIL,
    enableReinitialize: true
})
class ProvidesDetailDialog extends Component {
    static dialogName = DIALOG.PROVIDE_DETAIL;
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static propTypes = {
        hideDialog: PropTypes.func,
        handleSubmit: PropTypes.func,
        actions: PropTypes.objectOf(PropTypes.func),
        dispatch: PropTypes.func,
        visible: PropTypes.bool,
        submitting: PropTypes.bool,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        provide: PropTypes.object,
        categoryList: PropTypes.array
    };

    componentDidMount() {
        const { actions: { getCategories }, categoryList = [] } = this.props;
        if (!categoryList.length) {
            getCategories();
        }
    }

    handleSubmit = (values) => {
        const { provide, actions } = this.props;
        const func = provide?.id ? 'editProvide' : 'addProvide';
        actions[func](values, provide?.id).then(() => {
            message.success('保存成功！');
            this.hideDialog();
        }).catch(() => { message.success('保存失败！'); });
    };

    hideDialog = () => {
        const { hideDialog, actions: { resetForm } } = this.props;
        hideDialog(DIALOG.PROVIDE_DETAIL)();
        resetForm(DIALOG.PROVIDE_DETAIL);
    };

    renderCategoryOptions = () => {
        const { categoryList = [] } = this.props;
        return renderOptions('code', 'name')(categoryList);
    };

    render() {
        const {submitting, handleSubmit, visible, width, dispatch } = this.props;
        return (
            <Modal
                visible={visible}
                width={width}
                title="编辑供应商信息"
                onCancel={this.hideDialog}
                footer={[
                    <Button key="submit" onClick={() => dispatch(submit(DIALOG.PROVIDE_DETAIL))} loading={submitting} type="primary">保存</Button>,
                    <Button key="back" onClick={this.hideDialog}>取消</Button>
                ]}
            >
                <Form name="oneClickTag" onSubmit={handleSubmit(this.handleSubmit)}>
                    <Field
                        labelClassName="col-md-2"
                        className="col-md-8"
                        rowClassName="dialogContainer__inputRow"
                        name="name"
                        component={renderTextField}
                        type="text"
                        label="名称"
                        validate={required}/>
                    <Field
                        labelClassName="col-md-2"
                        className="col-md-8"
                        rowClassName="dialogContainer__inputRow"
                        name="typeCode"
                        component={renderSelectField}
                        type="text"
                        label="种类"
                        validate={required}
                    >
                        { this.renderCategoryOptions() }
                    </Field>
                    <Field
                        labelClassName="col-md-2"
                        className="col-md-8"
                        rowClassName="dialogContainer__inputRow"
                        name="manager"
                        component={renderTextField}
                        type="text"
                        label="负责人"
                        validate={required}/>
                    <Field
                        labelClassName="col-md-2"
                        className="col-md-8"
                        rowClassName="dialogContainer__inputRow"
                        name="tel"
                        component={renderTextField}
                        type="text"
                        label="联系方式"
                        validate={required}/>
                    <Field
                        labelClassName="col-md-2"
                        className="col-md-8"
                        rowClassName="dialogContainer__inputRow"
                        name="address"
                        component={renderTextField}
                        type="text"
                        label="邮寄地址"
                        validate={required}/>
                    <Field
                        labelClassName="col-md-2"
                        className="col-md-8"
                        rowClassName="dialogContainer__inputRow"
                        name="introduce"
                        component={renderTextField}
                        type="textarea"
                        label="简介"
                        rows={4}
                    />
                </Form>
            </Modal>
        );
    }
}

export default ProvidesDetailDialog;
