import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DIALOG, renderOptions } from 'constants';
import { Button, Modal } from 'antd';
import {Form, Field, reduxForm, submit} from 'redux-form';
import {connect} from 'react-redux';
import { renderSelectField } from '../../shared/form/index';

@connect(state => ({oneClick: state.oneClick, initialValues: state.oneClick?.oneClick}))
@reduxForm({
    form: DIALOG.ONE_CLICK_TAG
})
class OneClickTagDialog extends Component {
    static dialogName = DIALOG.ONE_CLICK_TAG;
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
        oneClick: PropTypes.object
    };

    handleSubmit(values) {
        const { actions: { setCurrentTags }, hideDialog } = this.props;
        setCurrentTags(values);
        hideDialog(DIALOG.ONE_CLICK_TAG)();
    }

    renderCategoryOptions = () => {
        const { oneClick: { categoryList = [] } } = this.props;
        return renderOptions('code', 'name')(categoryList);
    };

    render() {
        const {submitting, handleSubmit, visible, hideDialog, width, dispatch } = this.props;
        return (
            <Modal
                visible={visible}
                width={width}
                title="添加标签"
                onCancel={hideDialog(DIALOG.ONE_CLICK_TAG)}
                footer={[
                    <Button key="submit" onClick={() => dispatch(submit(DIALOG.ONE_CLICK_TAG))} loading={submitting} type="primary">保存</Button>,
                    <Button key="back" onClick={hideDialog(DIALOG.ONE_CLICK_TAG)}>取消</Button>
                ]}
            >
                <Form name="oneClickTag" onSubmit={handleSubmit(this.handleSubmit)}>
                    <Field
                        labelClassName="col-md-2"
                        className="col-md-8"
                        rowClassName="dialogContainer__inputRow"
                        name="categoryCode"
                        component={renderSelectField}
                        type="text"
                        label="种类"
                    >
                        { this.renderCategoryOptions() }
                    </Field>
                </Form>
            </Modal>
        );
    }
}

export default OneClickTagDialog;
