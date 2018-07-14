import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import panelStyle from 'layout/main/Main.scss';
import { PANEL_TITLE, PATHNAME, getLinkByName, renderOptions } from 'constants';
import {reduxForm, Field, getFormValues, SubmissionError} from 'redux-form';
import { connect } from 'react-redux';
import { Button, Select, message } from 'antd';
import Header from '../shared/panel/PanelHeader';
import { renderTextField, renderSelectField, renderQuill, UploadFilesField } from '../shared/form';

const required = value => (value ? undefined : '不能为空！');

function mapStateToProps(state) {
    return {
        initialValues: state.lecturers?.lecturer,
        values: getFormValues('lecturesCreate')(state),
        provides: state.lecturers?.provides,
        lecturer: state.lecturers?.lecturer,
        levels: state.lecturers?.levels
    };
}

@connect(mapStateToProps)
@reduxForm({form: 'lecturesCreate', enableReinitialize: true })
class LecturersCreate extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        actions: PropTypes.object,
        submitting: PropTypes.bool,
        values: PropTypes.object,
        provides: PropTypes.object,
        lecturer: PropTypes.object,
        levels: PropTypes.array
    };

    componentDidMount() {
        const { provides, lecturer, levels, actions: { loadProvides, getLecturer, loadLevels } } = this.props;
        if (/edit$/g.test(location.pathname) && !lecturer) {
            const id = location.pathname.match(/(\w)+(?=\/edit$)/g)[0];
            if (id) {
                getLecturer(id);
            }
        }

        if (!provides) {
            loadProvides();
        }

        if (!levels) {
            loadLevels();
        }
    }

    generateData = (values) => {
        const { lecturer, actions } = this.props;
        const file = values.avatarUrl?.[0];
        try {
            if (file) {
                Object.assign(values, {avatarUrl: file?.response?.locations[0]});
            }
        } catch (error) {
            throw new SubmissionError({cover: '上传头像失败！'});
        }
        const func = lecturer?.id ? 'editLecturer' : 'addLecturer';
        actions[func](values, lecturer?.id).then(() => {
            message.success('保存成功！');
            this.back();
        }).catch(() => {message.success('保存失败！');});
    };

    back = () => {
        const { actions: { push }} = this.props;
        push(getLinkByName(PATHNAME.MASTER));
    };

    renderProvidesOptions = () => {
        const { provides = [] } = this.props;
        return renderOptions('id', 'name')(provides);
    };

    renderLevelOptions = () => {
        const { levels } = this.props;
        return renderOptions('code', 'name')(levels);
    };

    render() {
        const { submitting, handleSubmit, values = {}, lecturer } = this.props;
        const { typeCode } = values;
        const isProvideVisible = typeCode === '2';
        const title = lecturer?.id ? PANEL_TITLE.MASTER_EDIT : PANEL_TITLE.MASTER_ADD;
        return (
            <Fragment>
                <Header title={title}/>
                <div className={panelStyle.panel__body}>
                    <form name="lecturesCreate" onSubmit={handleSubmit(this.generateData)}>

                        <Field
                            className="col-md-4 col-lg-3"
                            rowClassName="inputRow"
                            name="typeCode"
                            component={renderSelectField}
                            type="text"
                            label="类别"
                            placeholder="请选择类别"
                            validate={required}
                        >
                            <Select.Option value="1">内训</Select.Option>
                            <Select.Option value="2">外训</Select.Option>
                        </Field>

                        { isProvideVisible &&
                            <Field
                                className="col-md-4 col-lg-3"
                                rowClassName="inputRow"
                                name="provideId"
                                component={renderSelectField}
                                type="text"
                                label="供应商"
                                placeholder="请选择供应商">
                                { this.renderProvidesOptions() }
                            </Field>
                        }


                        <Field
                            className="col-md-4 col-lg-3"
                            rowClassName="inputRow"
                            name="name"
                            component={renderTextField}
                            type="text"
                            placeholder="姓名"
                            label="姓名"
                            validate={required}
                        />

                        <Field
                            className="col-md-4 col-lg-3"
                            rowClassName="inputRow"
                            name="avatarUrl"
                            component={UploadFilesField}
                            type="text"
                            label="头像"
                            uploadTitle="本地上传"
                            uploadFileCount="1"
                            accept="image/*"
                        />

                        <Field
                            className="col-md-4 col-lg-3"
                            rowClassName="inputRow"
                            name="gender"
                            component={renderSelectField}
                            type="text"
                            label="性别"
                            placeholder="请选择性别"
                            validate={required}
                        >
                            <Select.Option value="男">男</Select.Option>
                            <Select.Option value="女">女</Select.Option>
                        </Field>

                        <Field
                            className="col-md-4 col-lg-3"
                            rowClassName="inputRow"
                            name="range"
                            component={renderTextField}
                            type="text"
                            placeholder="讲授范围"
                            label="讲授范围"
                        />

                        <Field
                            className="col-md-4 col-lg-3"
                            rowClassName="inputRow"
                            name="levelCode"
                            component={renderSelectField}
                            type="text"
                            label="等级"
                            placeholder="请选择等级"
                        >
                            {this.renderLevelOptions()}
                        </Field>

                        <Field
                            className="col-md-8 col-lg-6"
                            rowClassName="inputRow inputRow__richText"
                            name="introduce"
                            component={renderQuill}
                            type="text"
                            label="简介"
                        />

                        <div className="row inputRow">
                            <div className="col-md-8 col-lg-6 offset-md-2 offset-lg-1 u-text-right">
                                <Button key="back" onClick={this.back} loading={submitting} type="secondary" className="editable-add-btn">取消</Button>
                                <Button htmlType="submit" loading={submitting} type="primary" className="editable-add-btn">保存</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </Fragment>
        );
    }
}
export default LecturersCreate;
