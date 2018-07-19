import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import panelStyle from 'layout/main/Main.scss';
import { PANEL_TITLE, PATHNAME, getLinkByName, renderOptions } from 'constants';
import {reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Button, Select, message } from 'antd';
import Header from '../shared/panel/PanelHeader';
import TaskLessonDialog from './TaskLessonDialog';
import {
    renderTextField,
    renderSelectField,
    renderQuill,
    renderDateRangeField,
    renderSwitch
} from '../shared/form';

const required = value => (value ? undefined : '不能为空！');
function mapStateToProps(state) {
    return {
        directions: state.tasks?.directions,
        onlineLessons: state.tasks?.onlineLessons,
        oneClicks: state.tasks?.oneClicks
    };
}

@connect(mapStateToProps)
@reduxForm({form: 'taskCreate', enableReinitialize: true })
class TaskCreate extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        actions: PropTypes.object,
        submitting: PropTypes.bool,
        values: PropTypes.object,
        directions: PropTypes.array,
        onlineLessons: PropTypes.array,
        oneClicks: PropTypes.array
    };

    state = {
        dialogVisible: false,
        lessons: []
    };

    componentDidMount() {
        const { directions, onlineLessons, oneClicks,
            actions: { loadDirections, loadOnlineLessons, loadOneClicks } } = this.props;

        if (!directions) {
            loadDirections();
        }

        if (!onlineLessons) {
            loadOnlineLessons();
        }
        if (!oneClicks) {
            loadOneClicks();
        }
    }

    generateData = (values) => {
        const { actions: { addTask } } = this.props;
        addTask(values).then(() => {
            message.success('保存成功！');
            this.back();
        }).catch(() => {message.success('保存失败！');});
    };

    back = () => {
        const { actions: { push }} = this.props;
        push(getLinkByName(PATHNAME.LEARN_TASK));
    };

    renderDirections = (id) => {
       const { directions = [] } = this.props;
       return renderOptions('id', 'direction')(directions.filter(item => item.parentId === id));
    };

    render() {
        const { submitting, handleSubmit, values = {}, onlineLessons, oneClicks } = this.props;
        const { direction1 = '&' } = values;
        const { dialogVisible } = this.state;
        return (
            <Fragment>
                <Header title={PANEL_TITLE.TASK_ADD}/>
                <div className={panelStyle.panel__body}>
                    <form name="taskCreate" onSubmit={handleSubmit(this.generateData)}>
                        <Field
                            className="col-md-4 col-lg-3"
                            rowClassName="inputRow"
                            name="title"
                            component={renderTextField}
                            type="text"
                            placeholder="任务名称"
                            label="任务名称"
                            validate={required}
                        />
                        <Field
                            className="col-md-4 col-lg-3"
                            rowClassName="inputRow"
                            name="businessUnit"
                            component={renderTextField}
                            type="text"
                            label="任务单元"
                            placeholder="任务单元"
                            validate={required}
                        />
                        <Field
                            className="col-md-4 col-lg-3"
                            rowClassName="inputRow"
                            name="costCenter"
                            component={renderTextField}
                            type="text"
                            label="成本中心"
                            placeholder="成本中心"
                            validate={required}
                        />

                        <Field
                            className="col-md-4 col-lg-3"
                            rowClassName="inputRow"
                            name="isPlanOut"
                            component={renderSelectField}
                            type="text"
                            label="计划外培训"
                            placeholder="计划外培训"
                            validate={required}
                        >
                            <Select.Option value={true}>是</Select.Option>
                            <Select.Option value={false}>否</Select.Option>
                        </Field>

                        <Field
                            className="col-md-4 col-lg-3"
                            rowClassName="inputRow"
                            name="direction1"
                            component={renderSelectField}
                            type="text"
                            label="课程方向"
                            placeholder="课程方向"
                            validate={required}
                        >
                            {this.renderDirections('0')}
                        </Field>
                        <Field
                            className="col-md-4 col-lg-3"
                            rowClassName="inputRow"
                            name="direction2"
                            component={renderSelectField}
                            type="text"
                            label="  "
                            placeholder="课程方向"
                            validate={required}
                        >
                            {this.renderDirections(direction1)}
                        </Field>

                        <Field
                            className="col-md-4 col-lg-3"
                            rowClassName="inputRow"
                            name="trainType"
                            component={renderTextField}
                            type="text"
                            label="培训种类"
                            placeholder="培训种类"
                            validate={required}
                        />

                        <Field
                            className="col-md-4 col-lg-3"
                            rowClassName="inputRow"
                            name="costType"
                            component={renderTextField}
                            type="text"
                            label="成本类型"
                            placeholder="成本类型"
                            validate={required}
                        />

                        <Field
                            className="col-md-4 col-lg-3"
                            rowClassName="inputRow"
                            name="cost"
                            component={renderTextField}
                            type="text"
                            label="培训费用"
                            placeholder="0.00元"
                            validate={required}
                        />

                        <div className="row inputRow">
                            <label htmlFor="btn-lessons" className="col-md-2 col-lg-1">任务内容</label>
                            <div name="btn-lessons" className="col-md-4 col-lg-3">
                                <Button type="primary" onClick={() => this.setState({dialogVisible: true})}>添加课件</Button>
                            </div>
                        </div>

                        <Field
                            className="col-md-4 col-lg-3"
                            rowClassName="inputRow"
                            name="totalTime"
                            component={renderTextField}
                            type="text"
                            label="总课时"
                            placeholder="小时"
                            validate={required}
                        />

                        <Field
                            className="col-md-4 col-lg-3"
                            name="limitTime"
                            rowClassName="inputRow"
                            allowClear={true}
                            component={renderDateRangeField}
                            label="完成期限"
                        />

                        <Field
                            className="col-md-4 col-lg-3"
                            rowClassName="inputRow"
                            name="targetType"
                            component={renderSelectField}
                            type="text"
                            label="接收人"
                            placeholder="请选择接收人"
                            validate={required}
                        >
                            <Select.Option value="ALL">全员</Select.Option>
                            <Select.Option value="GROUP">学习群组</Select.Option>
                            <Select.Option value="USER">指定人员</Select.Option>
                        </Field>

                        <Field
                            className="col-md-8 col-lg-6"
                            rowClassName="inputRow inputRow__richText"
                            name="addition"
                            component={renderQuill}
                            type="text"
                            label="任务补充"
                        />

                        <Field
                            className="col-md-8 col-lg-6"
                            rowClassName="inputRow inputRow__richText"
                            name="summaryOn"
                            component={renderSwitch}
                            checkedChildren="开启"
                            unCheckedChildren="关闭"
                            defaultChecked
                            title="开启培训小结"
                            label="培训小结"
                        />

                        <Field
                            className="col-md-8 col-lg-6"
                            rowClassName="inputRow inputRow__richText"
                            name="ccLeader"
                            component={renderSwitch}
                            checkedChildren="开启"
                            unCheckedChildren="关闭"
                            defaultChecked
                            title="抄送领导"
                            label="抄送领导"
                        />

                        <Field
                            className="col-md-8 col-lg-6"
                            rowClassName="inputRow inputRow__richText"
                            name="surveyOn"
                            component={renderSwitch}
                            checkedChildren="开启"
                            unCheckedChildren="关闭"
                            defaultChecked
                            title="开启课后满意度问卷"
                            label="课后问卷"
                        />

                        <div className="row inputRow">
                            <div className="col-md-8 col-lg-6 offset-md-2 offset-lg-1 u-text-right">
                                <Button key="back" onClick={this.back} loading={submitting} type="secondary" className="editable-add-btn">取消</Button>
                                <Button htmlType="submit" loading={submitting} type="primary" className="editable-add-btn">保存</Button>
                            </div>
                        </div>
                    </form>
                </div>
                <TaskLessonDialog
                    visible={dialogVisible}
                    onHide={() => this.setState({dialogVisible: false})}
                    onChange={(val) => this.setState({dialogVisible: false, lessons: val})}
                    onlineLessons={onlineLessons}
                    oneClicks={oneClicks}
                />
            </Fragment>
        );
    }
}
export default TaskCreate;
