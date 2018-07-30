import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form, clearSubmitErrors, reset } from 'redux-form';
import { DIALOG } from 'constants';
import { Modal, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import MultipleMaterialTable from './MultipleMaterialTable';
import { renderTextField, renderSelectField } from '../../shared/form';

const mapStateToProp = (state) => {
    if (R.isEmpty(state.point) || !state?.point?.pointContent) return null;
    const { courseId, pointId } = state?.point?.pointContent;
    return {
        courseId,
        pointId,
        materialsType: state.point?.materialsType,
        materials: state.point?.materials,
        selectedMultipleMaterials: state.point?.selectedMultipleMaterials
    };
};

@connect(mapStateToProp)
@reduxForm({form: DIALOG.MULTIPLE_MATERIAL})
class MultipleMaterialDialog extends Component {
    static dialogName = DIALOG.MULTIPLE_MATERIAL;

    closeDialog = () => {
        this.props.dispatch(clearSubmitErrors(DIALOG.MULTIPLE_MATERIAL));
        this.props.hideDialog(DIALOG.MULTIPLE_MATERIAL)();
    }

    searchMaterial = (values) => {
        const {actions: {getMaterials}} = this.props;
        getMaterials(values);
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        const {actions: {getSelectedMultiMaterials}, materialsType} = this.props;
        getSelectedMultiMaterials(selectedRows, materialsType);
    }

    saveSelectedMaterials = () => {
        const {courseId, pointId, selectedMultipleMaterials, actions: {saveSelectedMultiMaterials}, dispatch, hideDialog} = this.props;
        let type;
        let ids;
        if (selectedMultipleMaterials && !R.isEmpty(selectedMultipleMaterials)) {
            type = Object.keys(selectedMultipleMaterials)[0];
            ids = selectedMultipleMaterials[type].map(item => item.id);
        }
        return saveSelectedMultiMaterials(courseId, pointId, ids, type)
            .then(() => {
                dispatch(clearSubmitErrors(DIALOG.MULTIPLE_MATERIAL));
                dispatch(reset(DIALOG.MULTIPLE_MATERIAL));
                hideDialog(DIALOG.MULTIPLE_MATERIAL)();
            });
    }

    render() {
        const {submitting, handleSubmit, visible, width, error, materials, selectedMultipleMaterials} = this.props;
        let keys = [];
        if (selectedMultipleMaterials) {
            if (selectedMultipleMaterials?.OL) {
                keys = selectedMultipleMaterials.OL.map(item => item.key);
            }

            if (selectedMultipleMaterials?.DL) {
                keys = selectedMultipleMaterials.DL.map(item => item.key);
            }
        }
        return (
            <Modal
                visible={visible}
                width={width}
                title="素材库"
                onCancel={this.closeDialog}
                footer={[
                    <Button key="submit" onClick={this.saveSelectedMaterials} loading={submitting} type="primary">保存</Button>,
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
                        <MultipleMaterialTable selectedKeys={keys} onChange={this.onSelectChange} dataSource={materials?.elements}/>
                    </div>
                </Form>
            </Modal>
        );
    }
}

MultipleMaterialDialog.propTypes = {
    hideDialog: PropTypes.func,
    handleSubmit: PropTypes.func,
    visible: PropTypes.bool,
    submitting: PropTypes.bool,
    materials: PropTypes.object,
    selectedMultipleMaterials: PropTypes.object,
    actions: PropTypes.objectOf(PropTypes.func),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    dispatch: PropTypes.func,
    courseId: PropTypes.string,
    pointId: PropTypes.string,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    materialsType: PropTypes.string
};

export default MultipleMaterialDialog;
