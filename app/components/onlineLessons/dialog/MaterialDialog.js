import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form, clearSubmitErrors } from 'redux-form';
import { DIALOG } from 'constants';
import { Modal, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import MaterialTable from './MaterialTable';
import { renderTextField, renderSelectField } from '../../shared/form';

@connect(state => ({materials: state.point?.materials, selectedMaterial: state.point?.selectedMaterial}))
@reduxForm({form: DIALOG.MATERIAL})
class MaterialDialog extends Component {
    static dialogName = DIALOG.MATERIAL;

    closeDialog = () => {
        this.props.dispatch(clearSubmitErrors(DIALOG.MATERIAL));
        this.props.hideDialog(DIALOG.MATERIAL)();
    }

    searchMaterial = (values) => {
        const {actions: {getMaterials}} = this.props;
        getMaterials(values);
    }

    onSelect = (record) => {
        const {actions: {getSelectedMaterial}} = this.props;
        getSelectedMaterial(record);
    }

    render() {
        const {submitting, handleSubmit, visible, width, error, materials, selectedMaterial} = this.props;
        const selectedKeys = selectedMaterial ? selectedMaterial.key : '';
        return (
            <Modal
                visible={visible}
                width={width}
                title="素材库"
                onCancel={this.closeDialog}
                footer={[
                    <Button key="submit" disabled={!selectedMaterial} onClick={this.closeDialog} loading={submitting} type="primary">保存</Button>,
                    <Button key="back" onClick={this.closeDialog}>取消</Button>
                ]}
            >
                <Form name="editform" onSubmit={handleSubmit(this.searchMaterial)}>
                    {error && <div className="dialogContainer--error"><strong >{error}</strong></div>}
                    <div className="row">
                        <Field
                            layout="elementOnly"
                            name="name"
                            rowClassName="col-md-4"
                            component={renderTextField}
                            type="text"
                            prefix={<Icon type="search"/>}
                            placeholder="关键字"
                        />

                        <Field
                            layout="elementOnly"
                            name="fileType"
                            rowClassName="col-md-3"
                            component={renderTextField}
                            type="text"
                            placeholder="文件类型"
                        />

                        <Field
                            layout="elementOnly"
                            name="tag"
                            rowClassName="col-md-3"
                            component={renderSelectField}
                            placeholder="标签"
                        />
                        <div className="col-md-2">
                            <Button
                                htmlType="submit"
                                loading={submitting}
                                type="primary">
                                搜索
                            </Button>
                        </div>
                    </div>
                    <div className="row">
                        <MaterialTable selectedKeys={selectedKeys} onSelect={this.onSelect} dataSource={materials?.elements}/>
                    </div>
                </Form>
            </Modal>
        );
    }
}

MaterialDialog.propTypes = {
    hideDialog: PropTypes.func,
    handleSubmit: PropTypes.func,
    visible: PropTypes.bool,
    submitting: PropTypes.bool,
    materials: PropTypes.object,
    selectedMaterial: PropTypes.object,
    actions: PropTypes.objectOf(PropTypes.func),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    dispatch: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

export default MaterialDialog;
