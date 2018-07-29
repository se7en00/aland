import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form, clearSubmitErrors, reset, SubmissionError} from 'redux-form';
import { DIALOG, renderOptions } from 'constants';
import { resetSpecificField } from 'utils';
import { Modal, Button, Icon, Tabs } from 'antd';
import { connect } from 'react-redux';
import { renderTextField, renderSelectField } from '../../shared/form/index';
import OnlineLessonTable from './OnlineLessonTable';
import OneClicksTable from './OneClicksTable';
import style from './TaskLessonDialog.scss';


const mapStateToProp = (state) => {
    if (R.isEmpty(state.tasks) || !state?.tasks?.onlineLessons || !state?.tasks?.oneClicks) return null;
    return {
        taskDetails: state.tasks.taskDetails,
        onlineLessons: state.tasks.onlineLessons,
        oneClicks: state.tasks.oneClicks,
        categoryList: state.tasks.categoryList,
        searchParams: state.tasks.searchParams,
        onlineLessonsSelected: state.tasks?.onlineLessonsSelected,
        pediasSelected: state.tasks?.pediasSelected
    };
};

@connect(mapStateToProp)
@reduxForm({form: DIALOG.TASK_LESSONS})
class TaskLessonDialog extends Component {
    static dialogName = DIALOG.TASK_LESSONS;

    state = {
        activeKey: '1'
    }

    closeDialog = () => {
        this.props.dispatch(clearSubmitErrors(DIALOG.TASK_LESSONS));
        this.props.hideDialog(DIALOG.TASK_LESSONS)();
    }

    renderCategoryOptions = () => {
        const {categoryList = []} = this.props;
        return renderOptions('code', 'name')(categoryList);
    }

    search = (values) => {
        const {actions: {searchOnlineLessons, searchOneClicks, setSearchParamsToRedux, selectedLessons}} = this.props;
        const {activeKey} = this.state;
        let params;
        if (activeKey === '1') {
            params = {};
            if (values.name) {
                params.name = values.name;
            }

            if (values.category) {
                params.category = values.category;
            }

            searchOnlineLessons({pageSize: 10, ...params}).then(() => {
                selectedLessons(null, 'onlineLessons');
                setSearchParamsToRedux(params);
            });
        } else {
            params = {};
            if (values.oneClickName) {
                params.subject = values.oneClickName;
            }

            if (values.oneClickCategory) {
                params.category = values.oneClickCategory;
            }

            searchOneClicks({pageSize: 10, ...params}).then(() => {
                setSearchParamsToRedux(params);
                selectedLessons(null, 'pedias');
            });
        }
    }

    onSelectChange = (selectedRowKeys, selectedRows) => {
        const {actions: {selectedLessons}} = this.props;
        const {activeKey} = this.state;
        if (activeKey === '1') {
            selectedLessons(selectedRows, 'onlineLessons');
        } else {
            selectedLessons(selectedRows, 'pedias');
        }
    }

    handleTabChange = (activeKey) => {
        this.props.actions.setSearchParamsToRedux({});
        this.setState({activeKey});
    }

    saveSelectedLessons = () => {
        const {taskDetails, onlineLessonsSelected, pediasSelected, actions: {saveTaskLessons}, dispatch, hideDialog} = this.props;
        let lessions = [];
        if (onlineLessonsSelected) {
            const onlineLessons = onlineLessonsSelected.map(lesson => ({lessionId: lesson.id, type: 'COURSE'}));
            lessions = lessions.concat(onlineLessons);
        }

        if (pediasSelected) {
            const onlineLessons = pediasSelected.map(lesson => ({lessionId: lesson.id, type: 'PEDIA'}));
            lessions = lessions.concat(onlineLessons);
        }

        return saveTaskLessons(taskDetails.id, lessions)
            .then(() => {
                dispatch(clearSubmitErrors(DIALOG.TASK_LESSONS));
                dispatch(reset(DIALOG.TASK_LESSONS));
                hideDialog(DIALOG.TASK_LESSONS)();
            })
            .catch(error => {
                throw new SubmissionError({
                    _error: error?.errorMessage || '创建节失败'
                });
            });
    }

    render() {
        const TabPane = Tabs.TabPane;
        const {submitting, handleSubmit, visible, width, error, onlineLessonsSelected, pediasSelected, onlineLessons, oneClicks, actions, dispatch, searchParams} = this.props;
        const restCategoryOneClick = () => resetSpecificField(dispatch, DIALOG.TASK_LESSONS, 'oneClickCategory', '');
        const restCategoryOnlineLess = () => resetSpecificField(dispatch, DIALOG.TASK_LESSONS, 'onlineLessCategory', '');
        const onlineKeys = onlineLessonsSelected ? onlineLessonsSelected.map(item => item.key) : [];
        const pediasKeys = pediasSelected ? pediasSelected.map(item => item.key) : [];
        return (
            <Modal
                visible={visible}
                width={width}
                title="课件"
                className={style.lessonDialog}
                onCancel={this.closeDialog}
                footer={[
                    <Button
                        key="submit"
                        onClick={this.saveSelectedLessons}
                        loading={submitting}
                        type="primary"
                    >
                        保存
                    </Button>,
                    <Button key="back" onClick={this.closeDialog}>取消</Button>
                ]}
            >
                <Form name="editform" onSubmit={handleSubmit(this.search)}>
                    {error && <div className="dialogContainer--error"><strong >{error}</strong></div>}
                    <Tabs defaultActiveKey="1" onChange={this.handleTabChange}>
                        <TabPane tab="线上课程" key="1">
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
                                    rowClassName="col-md-2"
                                    name="category"
                                    allowClear={true}
                                    resetSelectValue={restCategoryOnlineLess}
                                    component={renderSelectField}
                                    placeholder="种类"
                                >
                                    {this.renderCategoryOptions()}
                                </Field>

                                <div className="col-md-2">
                                    <Button
                                        htmlType="submit"
                                        loading={submitting}
                                        type="primary">
                                            搜索
                                    </Button>
                                </div>
                            </div>
                            <OnlineLessonTable
                                searchParams={searchParams}
                                selectedKeys={onlineKeys}
                                actions={actions}
                                onChange={this.onSelectChange}
                                dataSource={onlineLessons}
                            />
                        </TabPane>

                        <TabPane tab="一点通" key="2">
                            <div className="row">
                                <Field
                                    layout="elementOnly"
                                    name="oneClickName"
                                    rowClassName="col-md-4"
                                    component={renderTextField}
                                    type="text"
                                    prefix={<Icon type="search"/>}
                                    placeholder="关键字"
                                />

                                <Field
                                    layout="elementOnly"
                                    rowClassName="col-md-2"
                                    name="oneClickCategory"
                                    allowClear={true}
                                    resetSelectValue={restCategoryOneClick}
                                    component={renderSelectField}
                                    placeholder="种类"
                                >
                                    {this.renderCategoryOptions()}
                                </Field>

                                <div className="col-md-2">
                                    <Button
                                        htmlType="submit"
                                        loading={submitting}
                                        type="primary">
                                        搜索
                                    </Button>
                                </div>
                            </div>
                            <OneClicksTable
                                onChange={this.onSelectChange}
                                searchParams={searchParams}
                                selectedKeys={pediasKeys}
                                actions={actions}
                                dataSource={oneClicks}
                            />
                        </TabPane>
                    </Tabs>
                </Form>
            </Modal>
        );
    }
}

TaskLessonDialog.propTypes = {
    hideDialog: PropTypes.func,
    handleSubmit: PropTypes.func,
    visible: PropTypes.bool,
    submitting: PropTypes.bool,
    onlineLessons: PropTypes.object,
    oneClicks: PropTypes.object,
    searchParams: PropTypes.object,
    onlineLessonsSelected: PropTypes.array,
    pediasSelected: PropTypes.array,
    categoryList: PropTypes.array,
    actions: PropTypes.objectOf(PropTypes.func),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    dispatch: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    taskDetails: PropTypes.object
};

export default TaskLessonDialog;
