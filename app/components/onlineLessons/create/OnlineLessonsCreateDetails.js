import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import uuidv4 from 'uuid/v4';
import { DIALOG } from 'constants';
import { Button, Menu, Dropdown, Icon, Select, Switch, List, Divider } from 'antd';
import { renderTextField, renderUploadField, renderSelectField } from '../../shared/form';


@reduxForm({form: 'onlineLessonsCreate'})
class OnlineLessonsCreateDetails extends Component {
    static propTypes = {
        // actions: PropTypes.objectOf(PropTypes.func),
        handleSubmit: PropTypes.func,
        showDialog: PropTypes.func,
        submitting: PropTypes.bool
        // error: PropTypes.string
    };

    listData = [{
        title: '题目来源',
        content: (
            <Fragment>
                <div>
                    <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked className="u-push-right-xs"/>
                    <span>直接引用章节中的测试题作为课后测试</span>
                </div>
                <div>
                    <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked className="u-push-right-xs"/>
                    <span className="u-push-right-xs">制作课后测试题</span>
                    <Button name="sectionButton" type="primary">添加课后测试题</Button>
                </div>
            </Fragment>

        )
    }, {
        title: '随机测试',
        description: '设置用户练习时抽取的题目数量，数量不能为0并且不能超过题目总数',
        content: (
            <div className="row">
                <Field
                    rowClassName="col-md-6"
                    layout="elementOnly"
                    addonBefore="随机题数"
                    name="lessonName"
                    component={renderTextField}
                    type="text"
                    placeholder="随机题数"
                />
                <Field
                    rowClassName="col-md-6"
                    layout="elementOnly"
                    name="lessonName"
                    addonBefore="合格率（%）"
                    component={renderTextField}
                    type="text"
                    placeholder="合格率（%）"
                />
            </div>
        )
    }]

    buttonMenu = () => (
        <Menu >
            <Menu.Item key={uuidv4()}><i className="fas fa-desktop u-push-right-xs"/>PC预览</Menu.Item>
            <Menu.Item key={uuidv4()}><i className="fas fa-mobile-alt u-push-right-xs"/>手机预览</Menu.Item>
        </Menu>
    );


    render() {
        const Option = Select.Option;
        const { submitting, handleSubmit, showDialog} = this.props;

        return (
            <div>
                <form name="form" onSubmit={handleSubmit}>
                    <Field
                        className="col-md-8"
                        labelClassName="col-md-2"
                        rowClassName="inputRow"
                        name="lessonName"
                        component={renderTextField}
                        type="text"
                        placeholder="课程名称"
                        label="课程名称"
                    />

                    <Field
                        className="col-md-4"
                        labelClassName="col-md-2"
                        rowClassName="inputRow"
                        accept="image/*"
                        style={{alignItems: 'flex-start'}}
                        name="file"
                        uploadFileCount="1"
                        component={renderUploadField}
                        label="课程封面"
                    />

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

                    <Field
                        className="col-md-8"
                        labelClassName="col-md-2"
                        rowClassName="inputRow"
                        name="lessonName"
                        component={renderSelectField}
                        placeholder="讲师"
                        label="讲师"
                    >
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                    </Field>

                    <div className="row inputRow">
                        <label htmlFor="sectionButton" className="col-md-2">课程内容</label>
                        <div className="col-md-8">
                            <Button htmlType="button" onClick={showDialog(DIALOG.CHAPTER)} name="sectionButton" type="primary">添加章</Button>
                            <Button htmlType="button" onClick={showDialog(DIALOG.SECTION)} name="sectionButton" type="primary">添加节</Button>
                            <Button htmlType="button" onClick={showDialog(DIALOG.POINT)} name="sectionButton" type="primary">添加点</Button>
                        </div>
                    </div>

                    <div className="row inputRow">
                        <label htmlFor="sectionButton" className="col-md-2">课后测试</label>
                        <div className="col-md-8">
                            <Divider/>
                            <List
                                itemLayout="vertical"
                                dataSource={this.listData}
                                renderItem={item => (
                                    <List.Item>
                                        <List.Item.Meta
                                            title={item.title}
                                            description={item.description}
                                        />
                                        {item.content}
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>

                    <Dropdown overlay={this.buttonMenu()}>
                        <Button type="primary" icon="eye-o">预览 <Icon type="down"/></Button>
                    </Dropdown>
                    <Button loading={submitting} type="primary" className="editable-add-btn">保存</Button>
                    <Button type="primary" className="editable-add-btn" ghost>取消</Button>
                </form>
            </div>
        );
    }
}

OnlineLessonsCreateDetails.propTypes = {};

export default OnlineLessonsCreateDetails;
