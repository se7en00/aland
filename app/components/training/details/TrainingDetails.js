import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form, getFormValues, SubmissionError} from 'redux-form';
import { Button, Radio, message } from 'antd';
import uuid from 'uuid/v4';
import { renderOptions } from 'constants';
import { resetSpecificField } from 'utils';
import { connect } from 'react-redux';
import { renderTextField, UploadImageField, renderQuill, renderRadioGroupField, renderCascaderField, renderSelectField, CheckBoxGroupField } from '../../shared/form';
import AutoSelectSearch from '../../shared/autoSearch/AutoSelectSearch';

const required = value => (value ? undefined : '不能为空！');

function mapStateToProps(state) {
    const result = {
        fieldValues: getFormValues('trainingDetails')(state)
    };
    if (R.isEmpty(state.trainings) || !state.trainings?.trainingDetails) {
        return result;
    }
    const values = state.trainings.trainingDetails;
    const rebuildVaules = Object.keys(values).reduce((map, k) => {
        if (!values[k]) return map;
        if (k === 'direction1') {
            map.direction = [values.direction1, values.direction2];
        } else if (k === 'manager') {
            map[k] = {key: values.managerId, label: values.manager};
        } else if (k === 'cover') {
            map[k] = [values[k]];
        } else if (k === 'forms') {
            map[k] = values[k].split(',');
        } else if (k === 'receivers') {
            if (values.targetType === 'USER') {
                map.persons = values[k].map(item => ({key: item.receiverId, label: item.receiverName}));
            }
            if (values.targetType === 'GROUP') {
                map.userGroupId = values[k].map(item => ({key: item.receiverId, label: item.receiverName}))[0];
            }
        } else {
            map[k] = values[k];
        }
        return map;
    }, {});
    result.initialValues = rebuildVaules;
    return result;
}

@connect(mapStateToProps)
@reduxForm({form: 'trainingDetails', enableReinitialize: true})
class TrainingDetails extends Component {
    renderUserGroupOptions = () => {
        const {associations} = this.props;
        if (!associations?.userGroups) return;
        return renderOptions('id', 'name')(associations.userGroups);
    }

    renderTrainingOptions = () => {
        const {associations} = this.props;
        if (!associations?.trainingTypes) return;
        return renderOptions('name', 'name')(associations.trainingTypes);
    }

    renderFormsOptions = () => {
        const costs = ['讲授', '小组讨论', '视频案例', '游戏', '角色扮演', '行动学习', '团队共创', '世界咖啡', '现场演练', '户外拓展', '自定义'];
        return costs.map(item => ({label: item, value: item}));
    }
    renderBusinessOptions = () => {
        const {associations} = this.props;
        if (!associations?.businessUnit) return;
        return renderOptions('name', 'name')(associations.businessUnit);
    }
    renderCostcenterOptions = () => {
        const {associations} = this.props;
        if (!associations?.costCenter) return;
        return renderOptions('name', 'name')(associations.costCenter);
    }
    submit = (values) => {
        const {actions: {createTraining, updateTraining}, trainings} = this.props;
        const isEditable = trainings?.isEditable;
        const trainningId = trainings?.trainingDetails?.id;
        try {
            if (!values.cover || R.isEmpty(values.cover)) {
                Object.assign(values, {cover: null});
            } else {
                Object.assign(values, {cover: values.cover[0]?.response?.locations[0]});
            }
        } catch (error) {
            throw new SubmissionError({cover: '上传图片失败！'});
        }

        const params = Object.keys(values).reduce((map, k) => {
            if (k === 'direction') {
                map.direction1 = values[k][0];
                map.direction2 = values[k][1];
            } else if (k === 'forms') {
                if (Array.isArray(values[k])) {
                    map[k] = values[k].join(',');
                }
            } else if (k === 'manager') {
                map.managerId = values[k].key;
                map.manager = values[k].label;
            } else if (k === 'persons' && values.targetType === 'USER') {
                map.receivers = values[k].map(item => ({receiverId: item.key, receiverName: item.label}));
            } else if (k === 'userGroupId' && values.targetType === 'GROUP') {
                map.receivers = [{receiverId: values[k].key, receiverName: values[k].label}];
            } else {
                map[k] = values[k];
            }
            return map;
        }, {});

        if (isEditable && trainningId) {
            updateTraining(trainningId, params)
                .then(() => {message.success(`更新培训${values.title}成功！`);})
                .catch(() => {message.success(`更新培训${values.title}失败！`);});
        } else {
            createTraining(params)
                .then(() => {message.success(`保存培训${values.title}成功！`);})
                .catch(() => {message.success(`保存培训${values.title}失败！`);});
        }
    }

    render() {
        const { submitting, handleSubmit, dispatch, fieldValues, associations} = this.props;
        const targetType = fieldValues?.targetType || '';
        const courseDirectionOptions = associations?.courseDirections || [];
        const restManagerValue = () => resetSpecificField(dispatch, 'trainingDetails', 'manager', '');
        const restDirectionValue = () => resetSpecificField(dispatch, 'trainingDetails', 'direction', '');
        const restUserGroup = () => resetSpecificField(dispatch, 'trainingDetails', 'userGroupId', '');
        const resetPersonValue = () => resetSpecificField(dispatch, 'trainingDetails', 'persons', '');
        const restTrainingType = () => resetSpecificField(dispatch, 'trainingDetails', 'trainType', '');
        return (
            <div>
                <Form name="form" onSubmit={handleSubmit(this.submit)}>
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
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="businessUnit"
                        allowClear={true}
                        component={renderSelectField}
                        type="text"
                        placeholder="业务单元"
                        label="业务单元"
                    >
                        {this.renderBusinessOptions()}
                    </Field>
                    <Field
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="costCenter"
                        allowClear={true}
                        component={renderSelectField}
                        type="text"
                        placeholder="成本中心"
                        label="成本中心"
                    >
                     {this.renderCostcenterOptions()}
                    </Field> 
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

                    <Field
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="trainType"
                        showSearch={true}
                        allowClear={true}
                        resetSelectValue={restTrainingType}
                        component={renderSelectField}
                        placeholder="培训种类"
                        label="培训种类"
                        validate={required}
                    >
                        {this.renderTrainingOptions()}
                    </Field>

                    <Field
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        layout="horizontal"
                        labelClassName="col-md-2 col-lg-1"
                        name="direction"
                        style={{alignItems: 'flex-start'}}
                        resetSelectValue={restDirectionValue}
                        component={renderCascaderField}
                        options={courseDirectionOptions}
                        placeholder="课程方向"
                        label="课程方向"
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
                        style={{alignItems: 'flex-start'}}
                        component={CheckBoxGroupField}
                        type="text"
                        options={this.renderFormsOptions()}
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
                        renderOptions={renderOptions('id', 'name')}
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
                        <Radio key={uuid()} value="USER">指定人员</Radio>
                    </Field>

                    {
                        targetType === 'GROUP' &&
                        <Field
                            className="col-md-8 col-lg-6"
                            rowClassName="inputRow"
                            name="userGroupId"
                            showSearch={true}
                            labelInValue={true}
                            allowClear={true}
                            resetSelectValue={restUserGroup}
                            component={renderSelectField}
                            placeholder="学员群组"
                            label="学员群组"
                            validate={required}
                        >
                            {this.renderUserGroupOptions()}
                        </Field>
                    }

                    {
                        targetType === 'USER' &&
                        <AutoSelectSearch
                            api="/api/users"
                            query="name"
                            mode="multiple"
                            resetSelectValue={resetPersonValue}
                            labelClassName="col-md-2 col-lg-1"
                            className="col-md-8 col-lg-6"
                            rowClassName="inputRow"
                            name="persons"
                            placeholder="搜索人员(可添加多个)"
                            label="人员"
                            validate={required}
                            renderOptions={renderOptions('id', 'name')}
                        />
                    }

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
                        className="col-md-10 col-lg-8"
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
    actions: PropTypes.objectOf(PropTypes.func),
    handleSubmit: PropTypes.func,
    dispatch: PropTypes.func,
    submitting: PropTypes.bool,
    trainings: PropTypes.object,
    fieldValues: PropTypes.object,
    associations: PropTypes.object
    // error: PropTypes.string,
};

export default TrainingDetails;
