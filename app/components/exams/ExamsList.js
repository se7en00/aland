import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DATE_FORMAT, PANEL_TITLE, DIALOG } from 'constants';
import { paginationSetting } from 'utils';
import { Button, message } from 'antd';
import { reduxForm, Field } from 'redux-form';
import panelStyle from '../../layout/main/Main.scss';
import Header from '../shared/panel/PanelHeader';
import ExamsListTable from './ExamsListTable';
import ExamsSearch from './ExamsSearch';
import { UploadFilesField } from '../shared/form';
import template from './template.xlsx';


@reduxForm({form: 'examsUpload'})
class ExamsList extends Component {
    static propTypes = {
        showDialog: PropTypes.func,
        actions: PropTypes.objectOf(PropTypes.func),
        exams: PropTypes.object
    };

    componentDidMount() {
        this.props.actions.getExamsList({pageSize: paginationSetting.pageSize})
            .then(() => this.props.actions.getCategories());
    }

    openCreateDialog = () => {
        const {showDialog} = this.props;
        showDialog(DIALOG.CREATE_EXAM)();
    }

    onSearch = (values) => {
        const { setSearchParamsToRedux, getExamsList} = this.props.actions;
        //search 条件
        const params = Object.keys(values).reduce((map, k) => {
            if (k === 'dateTime') {
                map.startDate = moment(values[k][0]).valueOf();
                map.endDate = moment(values[k][1]).valueOf();
            } else {
                map[k] = values[k];
            }
            return map;
        }, {});
        getExamsList({pageSize: paginationSetting.pageSize, ...params})
            .then(() => setSearchParamsToRedux(params));
    };

    onImportFile = (event, values) => {
        if (values?.url) {
            const filePath = values.url;
            const {getExamsList, importExams} = this.props.actions;
            importExams(filePath).then(() => {
                message.success('导入试题成功');
                getExamsList({pageSize: paginationSetting.pageSize});
            }).catch(() => {message.error('导入试题失败');});
        }
    }

    render() {
        const {exams: {list, searchParams, categoryList}, actions, showDialog} = this.props;
        return (
            <div>
                <Header title={PANEL_TITLE.EXAM_LIST}/>
                <div className={panelStyle.panel__body}>
                    <ExamsSearch onSubmit={this.onSearch} categoryList={categoryList}/>
                    <Button onClick={this.openCreateDialog} type="primary" className="editable-add-btn u-pull-down-md" ghost>新增试题</Button>
                    <a href={template} download="下载模版.xlsx" className="ant-btn" style={{marginLeft: '20px'}}>下载模版</a>
                    <form style={{display: 'inline-block'}}>
                        <Field
                            layout="elementOnly"
                            className="col-md-3 col-lg-1"
                            style={{display: 'inline-block'}}
                            name="files"
                            onChange={this.onImportFile}
                            onlyOneFile={true}
                            component={UploadFilesField}
                            uploadTitle="导入试题"
                        />
                    </form>

                    <ExamsListTable
                        showDialog={showDialog}
                        dataSource={list}
                        actions={actions}
                        searchParams={searchParams}/>
                </div>
            </div>
        );
    }
}

export default ExamsList;
