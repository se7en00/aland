import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PATHNAME, getLinkByName, DIALOG } from 'constants';
import { reduxForm, Field } from 'redux-form';
import { Button, message } from 'antd';
import { renderTextField} from '../../shared/form';

@reduxForm({form: 'oneClickBase'})
class OneClickBase extends Component {
    componentDidMount() {
        const { actions: { getCategories } } = this.props;
        getCategories();
    }

    generateData = (values) => {
        const { handleSave, oneClick: { currentTags, oneClick } , editType } = this.props;
        if (currentTags && currentTags.categoryCode) {
            Object.assign(values, { categoryCode: currentTags.categoryCode });
        }
        const data = R.pick(['categoryCode', 'subject', 'summary', 'trainTarget', 'introduce', 'benefit'], values);
        handleSave(data, oneClick?.id).then((data) => {
            message.success('保存成功！');
            editType === "create"?this.toDetail(data.value.id):this.back();
        }).catch(() => { message.success('保存失败！'); });
    };

    toDetail = (id)=>{
        const { actions: { push }} = this.props;
        push(`${getLinkByName(PATHNAME.ONE_CLICK)}/${id}/detail`);
    };

    back = () => {
        const { actions: { push }} = this.props;
        push(getLinkByName(PATHNAME.ONE_CLICK));
    };

    render() {
        const { submitting, handleSubmit, showDialog } = this.props;
        return (
            <form name="form" onSubmit={handleSubmit(this.generateData)}>
                <div className="row inputRow">
                    <label htmlFor="sectionButton" className="col-md-2 col-lg-1">标签</label>
                    <div className="col-md-8 col-lg-6">
                        <Button name="sectionButton" type="primary" onClick={showDialog(DIALOG.ONE_CLICK_TAG)}>添加标签</Button>
                    </div>
                </div>

                <Field
                    className="col-md-8 col-lg-6"
                    rowClassName="inputRow"
                    name="subject"
                    component={renderTextField}
                    type="text"
                    placeholder="主题"
                    label="主题"
                />

                <Field
                    className="col-md-8 col-lg-6"
                    rowClassName="inputRow"
                    name="summary"
                    component={renderTextField}
                    type="text"
                    placeholder="摘要"
                    label="摘要"
                />

                <Field
                    className="col-md-8 col-lg-6"
                    rowClassName="inputRow"
                    name="trainTarget"
                    component={renderTextField}
                    type="text"
                    placeholder="只写培训对象（类似车间人员），只是当做参考"
                    label="培训对象"
                />

                <Field
                    className="col-md-8 col-lg-6"
                    rowClassName="inputRow"
                    name="introduce"
                    style={{alignItems: 'flex-start'}}
                    component={renderTextField}
                    rows={4}
                    type="textarea"
                    placeholder="简介"
                    label="简介"
                />

                <Field
                    className="col-md-8 col-lg-6"
                    rowClassName="inputRow"
                    name="benefit"
                    style={{alignItems: 'flex-start'}}
                    component={renderTextField}
                    rows={4}
                    type="textarea"
                    placeholder="学习收益"
                    label="学习收益"
                />

                <div className="row inputRow">
                    <div className="col-md-8 col-lg-6 offset-md-2 offset-lg-1 u-text-right">
                        <Button key="back" onClick={this.back} loading={submitting} type="secondary" className="editable-add-btn">取消</Button>
                        <Button htmlType="submit" loading={submitting} type="primary" className="editable-add-btn">保存</Button>
                    </div>
                </div>
            </form>
        );
    }
}
OneClickBase.propTypes = {
    handleSubmit: PropTypes.func,
    submitting: PropTypes.bool,
    actions: PropTypes.object,
    oneClick: PropTypes.object,
    showDialog: PropTypes.func,
    handleSave: PropTypes.func
};

export default OneClickBase;
