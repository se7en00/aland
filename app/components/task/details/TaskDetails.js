import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form, getFormValues} from 'redux-form';
import { Button, Radio, message } from 'antd';
import uuid from 'uuid/v4';
import { renderOptions, getLinkByName, PATHNAME } from 'constants';
import { resetSpecificField } from 'utils';
import { connect } from 'react-redux';
import { renderTextField, renderQuill, renderRadioGroupField, renderCascaderField,
    renderSelectField, renderDateRangeField, renderCheckboxField, renderSwitch } from '../../shared/form';
import AutoSelectSearch from '../../shared/autoSearch/AutoSelectSearch';
import AutoTreeSelect from '../../shared/autoSearch/AutoTreeSelect'
const required = value => (value ? undefined : '不能为空！');

function mapStateToProps(state) {

    const result = {
        fieldValues: getFormValues('taskDetails')(state)
    };
    if (R.isEmpty(state.tasks) || !state.tasks?.taskDetails) {
        return result;
    }
    const values = state.tasks.taskDetails;
    const rebuildVaules = Object.keys(values).reduce((map, k) => {
        if (!values[k]) return map;
        if (k === 'direction1') {
            map.direction = [values.direction1, values.direction2];
        } else if (k === 'startDate') {
            map.limitTime = values[k] ? [moment(values.startDate), moment(values.endDate)] : [];
        } else if (k === 'manager') {
            map[k] = {key: values.managerId, label: values.manager};
        } else if (k === 'forms') {
            map[k] = values[k].split(',');
        } else if (k === 'receivers') {
            if (values.targetType === 'USER') {
                map.persons = values[k].map(item => ({key: item.receiverId, label: item.receiverName}));
            }
            if (values.targetType === 'GROUP') {
                map.userGroupId = values[k].map(item => ({key: item.receiverId, label: item.receiverName}))[0];
            }
        } else if (k === 'summaryOn' || k === 'surveyOn' || k === 'ccLeader') {
            map[k] = values[k] === 'true';
        } else {
            map[k] = values[k];
        }
        return map;
    }, {});
    result.initialValues = rebuildVaules;
    return result;
}

@connect(mapStateToProps)
@reduxForm({form: 'taskDetails', enableReinitialize: true})
class TaskDetails extends Component {
    renderUserGroupOptions = () => {
        const {associations} = this.props;
        if (!associations?.userGroups) return;
        return renderOptions('id', 'name')(associations.userGroups);
    }


    popUserIds(obj){
        console.log(obj)
        this.extendObj = obj;
    }

    renderTrainingOptions = () => {
        console.log(this.props.associations)
        const {associations} = this.props;
        if (!associations?.trainingTypes) return;
        return renderOptions('name', 'name')(associations.trainingTypes);
    }

    renderCostOptions = () => {
        const {associations} = this.props;
        if (!associations?.costTypes) return;
        return renderOptions('name', 'name')(associations.costTypes);
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
        let _tmp=[];
        if(this.extendObj){
            this.extendObj.value.forEach(item=>{
                _tmp.push({
                    receiverId:item.value,
                    receiverName:item.label
                })
            })
            values.receivers = _tmp;
        }
        const {actions: {createTask, updateTask, push}, tasks} = this.props;
        const isEditable = tasks?.isEditable;
        const taskId = tasks?.taskDetails?.id;
        const params = Object.keys(values).reduce((map, k) => {
            if (k === 'limitTime') {
                map.startDate = moment(values[k][0]).valueOf();
                map.endDate = moment(values[k][1]).valueOf();
            } else if (k === 'manager') {
                map.managerId = values[k].key;
                map.manager = values[k].label;
            } else if (k === 'direction' || k === 'direction2') {
                if (k === 'direction2') {
                    delete values.direction2;
                } else {
                    map.direction1 = values[k][0];
                    map.direction2 = values[k][1];
                }
            } else if (k === 'persons' && values.targetType === 'USER') {
                map.receivers = values[k].map(item => ({receiverId: item.key, receiverName: item.label}));
            } else if (k === 'userGroupId' && values.targetType === 'GROUP') {
                map.receivers = [{receiverId: values[k].key, receiverName: values[k].label}];
            } else {
                map[k] = values[k];
            }
            return map;
        }, {});
        if (isEditable && taskId) {
            updateTask(taskId, params)
                .then(() => {
                    message.success(`更新学习任务${values.title}成功！`);
                    push(`${getLinkByName(PATHNAME.LEARN_TASK)}`);
                })
                .catch(() => {message.success(`更新学习任务${values.title}失败！`);});
        } else {
            createTask(params)
                .then(() => {
                    message.success(`保存学习任务${values.title}成功！`);
                    push(`${getLinkByName(PATHNAME.LEARN_TASK)}`);
                })
                .catch(() => {message.success(`保存学习任务${values.title}失败！`);});
        }
    }

    render() {
        const { submitting, handleSubmit, dispatch, tasks, fieldValues, associations} = this.props;
        
        let value =[]
        if(tasks.taskDetails && tasks.taskDetails.receivers && tasks.taskDetails.receivers.length>0){
            tasks.taskDetails.receivers.forEach(item=>{
            value.push({
                label:item.receiverName,
                value:item.receiverId
            })
          })
        }else{
            value = [{}]
        }
        console.log(associations);
        const targetType = fieldValues?.targetType || '';
        const courseDirectionOptions = associations?.courseDirections || [];
        const restManagerValue = () => resetSpecificField(dispatch, 'taskDetails', 'manager', '');
        const restRangeDateTime = () => resetSpecificField(dispatch, 'taskDetails', 'limitTime', '');
        const restDirectionValue = () => resetSpecificField(dispatch, 'taskDetails', 'direction', '');
        const restUserGroup = () => resetSpecificField(dispatch, 'taskDetails', 'userGroupId', '');
        const resetPersonValue = () => resetSpecificField(dispatch, 'taskDetails', 'persons', '');
        const restTrainingType = () => resetSpecificField(dispatch, 'taskDetails', 'trainType', '');
        const restCostType = () => resetSpecificField(dispatch, 'taskDetails', 'costType', '');
       const restBusinessUnit =()=>resetSpecificField(dispatch, 'taskDetails', 'businessUnit', '');
       const restCostCenter = ()=>resetSpecificField(dispatch, 'taskDetails', 'costCenter', '');
        return (
            <div>
                <Form name="form" onSubmit={handleSubmit(this.submit)}>
                    <Field
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="title"
                        component={renderTextField}
                        type="text"
                        placeholder="任务名称"
                        label="任务名称"
                        validate={required}
                    />

                     <Field
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="businessUnit"
                        component={renderSelectField}
                        resetSelectValue={restBusinessUnit}
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
                        resetSelectValue={restCostCenter}
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
                    >
                    
                        {this.renderTrainingOptions()}
                    </Field>
                   
                    <Field
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="costType"
                        showSearch={true}
                        allowClear={true}
                        resetSelectValue={restCostType}
                        component={renderSelectField}
                        placeholder="成本类型"
                        label="成本类型"
                    >
                        {this.renderCostOptions()}
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
                        name="totalTime"
                        component={renderTextField}
                        type="text"
                        placeholder="小时"
                        label="总课时"
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
                        name="limitTime"
                        allowClear={true}
                        resetSelectValue={restRangeDateTime}
                        component={renderDateRangeField}
                        label="完成期限"
                    />

                    <Field
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="targetType"
                        defaultValue="ALL"
                        component={renderRadioGroupField}
                        label="学习对象"
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
                            filterOption={this.filterDept}
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
                        // <AutoSelectSearch
                        //     api="/api/users"
                        //     query="name"
                        //     mode="multiple"
                        //     resetSelectValue={resetPersonValue}
                        //     labelClassName="col-md-2 col-lg-1"
                        //     className="col-md-8 col-lg-6"
                        //     rowClassName="inputRow"
                        //     name="persons"
                        //     placeholder="搜索人员(可添加多个)"
                        //     label="人员"
                        //     validate={required}
                        //     renderOptions={renderOptions('id', 'name')}
                        // />
                        <AutoTreeSelect
                        
                        api="/api/departments/users"
                        label="人员"
                        mode="multiple"
                        popUserIds={this.popUserIds.bind(this)}
                        labelClassName="col-md-2 col-lg-1"
                        className="col-md-8"
                        rowClassName="inputRow"
                        labelInValue={true}
                        name="userIds"
                        placeholder="搜索人员(可添加多个)"
                        values={value}
                    />
                    }

                    <Field
                        className="col-md-10 col-lg-8"
                        rowClassName="inputRow"
                        name="addition"
                        label="任务补充"
                        onlyTextEditable={true}
                        component={renderQuill}
                    />

                    <Field
                        name="summaryOn"
                        className="col-md-6 col-lg-6 u-push-right-xs"
                        rowClassName="inputRow"
                        component={renderSwitch}
                        checkedChildren="开启"
                        unCheckedChildren="关闭"
                        defaultChecked
                        label="培训小结"
                        title="培训小结"
                    />

                    <Field
                        className="col-md-6 col-lg-6 u-push-right-xs"
                        rowClassName="inputRow"
                        name="ccLeader"
                        defaultChecked={false}
                        component={renderCheckboxField}
                        type="text"
                        label="抄送领导"
                    />

                    <Field
                        name="surveyOn"
                        className="col-md-8 col-lg-6 u-push-right-xs"
                        rowClassName="inputRow"
                        component={renderSwitch}
                        checkedChildren="开启"
                        unCheckedChildren="关闭"
                        defaultChecked
                        label="课后问卷"
                        title="课后满意度问卷"
                    />

                    <div className="row inputRow">
                        <div className="col-md-8 col-lg-6 offset-md-2 offset-lg-1">
                            <Button htmlType="submit" loading={submitting} type="primary" className="editable-add-btn">保存</Button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

TaskDetails.propTypes = {
    actions: PropTypes.objectOf(PropTypes.func),
    handleSubmit: PropTypes.func,
    dispatch: PropTypes.func,
    submitting: PropTypes.bool,
    tasks: PropTypes.object,
    fieldValues: PropTypes.object,
    associations: PropTypes.object
    // error: PropTypes.string,
};

export default TaskDetails;
