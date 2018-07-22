import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form } from 'redux-form';
import { Button, Radio } from 'antd';
import uuid from 'uuid/v4';
import { renderOptions } from 'constants';
import { resetSpecificField } from 'utils';
import { renderTextField, UploadImageField, renderQuill, renderRadioGroupField } from '../../shared/form';
import AutoSelectSearch from '../../shared/autoSearch/AutoSelectSearch';

const required = value => (value ? undefined : '不能为空！');

@reduxForm({form: 'trainingDetails'})
class TrainingDetails extends Component {
    //保存


    render() {
        const { submitting, handleSubmit, dispatch } = this.props;
        const restManagerValue = () => resetSpecificField(dispatch, 'trainingDetails', 'manager', '');
        // const restDirectionValue = () => resetSpecificField(dispatch, 'restDirectionValue', 'direction', '');
        return (
            <div>
                <Form name="form" onSubmit={handleSubmit}>
                    <Field
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="title"
                        component={renderTextField}
                        type="text"
                        placeholder="培训标题"
                        label="培训标题"
                        validate={required}
                    />

                    <Field
                        className="col-md-4 col-lg-3"
                        rowClassName="inputRow"
                        accept="image/*"
                        style={{alignItems: 'flex-start'}}
                        name="cover"
                        uploadFileCount="1"
                        component={UploadImageField}
                        uploadTitle="上传图片"
                        label="封面图片"
                    />

                    <Field
                        className="col-md-4 col-lg-6"
                        rowClassName="inputRow"
                        name="businessUnit"
                        component={renderTextField}
                        type="text"
                        placeholder="业务单元"
                        label="业务单元"
                    />

                    <Field
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="costCenter"
                        component={renderTextField}
                        type="text"
                        placeholder="成本中心"
                        label="成本中心"
                    />

                    <Field
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="isPlanOut"
                        defaultValue="1"
                        component={renderRadioGroupField}
                        label="计划外培训"
                    >
                        <Radio key={uuid()} value="1">是</Radio>
                        <Radio key={uuid()} value="0">否</Radio>
                    </Field>

                    {/*<Field*/}
                    {/*className="col-md-8 col-lg-6"*/}
                    {/*rowClassName="inputRow"*/}
                    {/*name="direction"*/}

                    {/*resetSelectValue={restDirectionValue}*/}
                    {/*component={renderCascaderField}*/}
                    {/*type="text"*/}
                    {/*placeholder="课程方向"*/}
                    {/*label="课程方向"*/}
                    {/*/>*/}

                    <Field
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="trainType"
                        component={renderTextField}
                        type="text"
                        placeholder="培训种类"
                        label="培训种类"
                    />

                    <Field
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="cost"
                        component={renderTextField}
                        type="text"
                        placeholder="0.00元"
                        label="培训费用"
                    />

                    <Field
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="forms"
                        component={renderTextField}
                        type="text"
                        placeholder="培训形式（多个请用逗号隔开）"
                        label="培训形式"
                    />

                    <Field
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="totalTime"
                        component={renderTextField}
                        type="text"
                        placeholder="小时"
                        label="总计课时"
                    />

                    <AutoSelectSearch
                        api="/api/users"
                        query="name"
                        resetSelectValue={restManagerValue}
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="manager"
                        placeholder="搜索负责人"
                        label="负责人"
                        renderOptions={renderOptions('name', 'name')}
                    />

                    <Field
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="targetType"
                        defaultValue="ALL"
                        component={renderRadioGroupField}
                        label="接收人"
                    >
                        <Radio key={uuid()} value="ALL">全员</Radio>
                        <Radio key={uuid()} value="GROUP">学习群组</Radio>
                        <Radio key={uuid()} value="SPECIFIC">指定人员</Radio>
                    </Field>

                    <Field
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="benefit"
                        style={{alignItems: 'flex-start'}}
                        component={renderTextField}
                        rows={4}
                        type="textarea"
                        placeholder="课程收益"
                        label="课程收益"
                    />

                    <Field
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="introduce"
                        label="课程介绍"
                        onlyTextEditable={true}
                        component={renderQuill}
                    />

                    <div className="row inputRow">
                        <div className="col-md-8 col-lg-6 offset-md-2 offset-lg-1 u-text-right">
                            <Button htmlType="submit" loading={submitting} type="primary" className="editable-add-btn">保存</Button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

TrainingDetails.propTypes = {
    // actions: PropTypes.objectOf(PropTypes.func),
    handleSubmit: PropTypes.func,
    dispatch: PropTypes.func,
    submitting: PropTypes.bool
    // trainings: PropTypes.object
    // error: PropTypes.string,
};

export default TrainingDetails;
