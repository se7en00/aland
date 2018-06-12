import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, Switch, List, Divider } from 'antd';
import { renderTextField } from '../../shared/form';

@reduxForm({form: 'onlineLessonsQuizzes'})
class OnlineLessonQuizzes extends Component {
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
    render() {
        return (
            <from>
                <div className="row inputRow">
                    <label htmlFor="sectionButton" className="col-md-2 col-lg-1">课后测试</label>
                    <div className="col-md-8 col-lg-6">
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
            </from>
        );
    }
}

OnlineLessonQuizzes.propTypes = {};
OnlineLessonQuizzes.defaultProps = {};

export default OnlineLessonQuizzes;
