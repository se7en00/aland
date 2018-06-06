import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import panelStyle from 'layout/main/Main.scss';
import { PANEL_TITLE } from 'constants';
import { reduxForm, Field } from 'redux-form';
import { Button} from 'antd';
import { renderTextField} from '../../shared/form';
import Header from '../../shared/panel/PanelHeader';


@reduxForm({form: 'oneClickCreate'})
class OneClickCreate extends Component {
    render() {
        const { submitting, handleSubmit} = this.props;
        return (
            <Fragment>
                <Header title={PANEL_TITLE.ONE_CLICK_ADD}/>
                <div className={panelStyle.panel__body}>
                    <form name="form" onSubmit={handleSubmit}>
                        <div className="row inputRow">
                            <label htmlFor="sectionButton" className="col-md-2">标签</label>
                            <div className="col-md-8">
                                <Button name="sectionButton" type="primary">添加标签</Button>
                            </div>
                        </div>

                        <Field
                            className="col-md-8"
                            labelClassName="col-md-2"
                            rowClassName="inputRow"
                            name="lessonName"
                            component={renderTextField}
                            type="text"
                            placeholder="主题"
                            label="主题"
                        />

                        <Field
                            className="col-md-8"
                            labelClassName="col-md-2"
                            rowClassName="inputRow"
                            name="lessonName"
                            component={renderTextField}
                            type="text"
                            placeholder="摘要"
                            label="摘要"
                        />

                        <Field
                            className="col-md-8"
                            labelClassName="col-md-2"
                            rowClassName="inputRow"
                            name="lessonName"
                            component={renderTextField}
                            type="text"
                            placeholder="培训对象"
                            label="培训对象"
                        />

                        <Field
                            className="col-md-8"
                            labelClassName="col-md-2"
                            rowClassName="inputRow"
                            name="lessonName"
                            style={{alignItems: 'flex-start'}}
                            component={renderTextField}
                            rows={4}
                            type="textarea"
                            placeholder="简介"
                            label="简介"
                        />

                        <Field
                            className="col-md-8"
                            labelClassName="col-md-2"
                            rowClassName="inputRow"
                            name="lessonName"
                            style={{alignItems: 'flex-start'}}
                            component={renderTextField}
                            rows={4}
                            type="textarea"
                            placeholder="学习收益"
                            label="学习收益"
                        />

                        <Button loading={submitting} type="primary" className="editable-add-btn">保存</Button>
                        <Button type="primary" className="editable-add-btn" ghost>取消</Button>
                    </form>
                </div>
            </Fragment>
        );
    }
}
OneClickCreate.propTypes = {
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool
};

export default OneClickCreate;
