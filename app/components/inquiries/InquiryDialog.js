import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Radio, List, Input } from 'antd';

class InquiryDialog extends Component {
    static propTypes = {
        onHide: PropTypes.func,
        visible: PropTypes.bool,
        data: PropTypes.object,
        onChange: PropTypes.func
    };

    state = {
        type: 'SINGLE',
        answers: [],
        question: ''
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible) {
            if (nextProps.data) {
                this.setState({...nextProps.data});
            } else {
                this.setState({
                    type: 'SINGLE',
                    answers: [],
                    question: ''
                });
            }
        }
    }

    onTypeChange = (e) => {
        const type = e.target.value;
        const answers = [];
        if (type === 'TOF') {
            answers.push({answer: '是'}, {answer: '否'});
        }
        this.setState({
            type,
            answers
        });
    };

    addAnswer = () => {
        const { answers } = this.state;
        const newAns = {
            answer: ''
        };
        this.setState({
            answers: [...answers, newAns]
        });
    };

    removeAnswer = (idx) => {
        const { answers } = this.state;
        this.setState({
            answers: answers.splice(idx, 1)
        });
    };

    handleAnswerChange = (e, idx) => {
        const { answers } = this.state;
        answers[idx].answer = e.target.value;
        this.setState({
            answers
        });
    };

    handleSubmit = () => {
        const { onChange } = this.props;
        onChange(this.state);
    };

    render() {
        const { visible, onHide, data } = this.props;
        const { type, answers, question } = this.state;
        const isAnswerVisible = ['SINGLE', 'MULTIPLE', 'TOF'].indexOf(type) >= 0;
        return (
            <Modal
                visible={visible}
                width={650}
                title="添加题目"
                onCancel={onHide}
                maskClosable={false}
                destroyOnClose={true}
                footer={[
                    <Button key="submit" onClick={this.handleSubmit} type="primary">保存</Button>,
                    <Button key="back" onClick={onHide}>取消</Button>
                ]}
            >
                <div>
                    <div className="row dialogContainer__inputRow">
                        <div className="col-md-10">
                            <Radio.Group onChange={this.onTypeChange} value={type} disabled={!!data}>
                                <Radio value="SINGLE">单选题</Radio>
                                <Radio value="MULTIPLE">多选题</Radio>
                                <Radio value="TOF">判断题</Radio>
                                <Radio value="FILL">填空题</Radio>
                                <Radio value="SIMPLE">简单题</Radio>
                            </Radio.Group>
                        </div>
                    </div>

                    <div className="row dialogContainer__inputRow">
                        <label htmlFor="question-name" className="col-md-2">题目</label>
                        <Input
                            className="col-md-8"
                            value={question}
                            type="text"
                            name="question-name"
                            onChange={(e) => { this.setState({ question: e.target.value}); }}
                        />
                    </div>

                    { isAnswerVisible &&
                    <div className="row dialogContainer__inputRow" style={{alignItems: 'flex-start'}}>
                        <label htmlFor="s" className="col-md-2">答案</label>
                        <div className="col-md-8">
                            { type === 'TOF' &&
                            <List
                                renderItem={() => false}>
                                <List.Item>
                                    <Radio name="radio-tof-yes"/>
                                    <label htmlFor="radio-tof-yes">是</label>
                                </List.Item>
                                <List.Item>
                                    <Radio name="radio-tof-no"/>
                                    <label htmlFor="radio-tof-yes">否</label>
                                </List.Item>
                            </List>
                            }
                            { type !== 'TOF' &&
                            <Fragment>
                                <Button onClick={this.addAnswer} icon="plus" type="primary" className="editable-add-btn" ghost>增加答案</Button>
                                <List
                                    locale={{emptyText: ''}}
                                    dataSource={answers}
                                    renderItem={(item, idx) => (<List.Item>
                                        <Input
                                            value={item.answer}
                                            type="text"
                                            onChange={(e) => this.handleAnswerChange(e, idx)}
                                        />
                                        <Button type="primary" onClick={() => this.removeAnswer(idx)} ghost>
                                            <i className="far fa-trash-alt"/>
                                        </Button>
                                    </List.Item>)}
                                />
                            </Fragment>
                            }
                        </div>
                    </div>
                    }
                </div>
            </Modal>
        );
    }
}

export default InquiryDialog;
