import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import panelStyle from 'layout/main/Main.scss';
import { Button, Select, Input, List, message } from 'antd';
import { connect } from 'react-redux';
import { PANEL_TITLE, PATHNAME, getLinkByName, renderOptions } from 'constants';
import Header from '../shared/panel/PanelHeader';
import InquiryDialog from './InquiryDialog';
import './InquiryDetail.scss';

function mapStateToProps(state) {
    return {
        categoryList: state.inquiries?.categoryList,
        inquiry: state.inquiries?.inquiry
    };
}

@connect(mapStateToProps)
class InquiryDetail extends Component {
    static propTypes = {
        inquiry: PropTypes.object,
        actions: PropTypes.object,
        categoryList: PropTypes.array
    };

    state = {
        id: '',
        name: '',
        categoryCode: 'COMMON',
        questions: [],
        questionSummary: {
            SINGLE: 0,
            MULTIPLE: 0,
            TOF: 0,
            FILL: 0,
            SIMPLE: 0,
            summary: 0
        },
        dialogVisible: false,
        currentIdx: null,
        errorMessage: ''
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.inquiry) {
            const { id, name, categoryCode, questions } = nextProps.inquiry;
            const { questionSummary } = this.state;
            const objSummary = questions.reduce((prev, current) => {
                const count = prev[current.type] || 0;
                prev[current.type] = count + 1;
                return prev;
            }, {});
            objSummary.summary = questions.length;
            Object.assign(questionSummary, objSummary);
            this.setState({
                id,
                name,
                categoryCode,
                questions,
                questionSummary
            });
        }
    }

    componentDidMount() {
        const { inquiry, categoryList, actions: { getInquiry, getCategories } } = this.props;
        if (/detail$/g.test(location.pathname) && !inquiry) {
            const id = location.pathname.match(/(\w)+(?=\/detail$)/g)[0];
            if (id) {
                getInquiry(id);
            }
        }
        if (!categoryList) {
            getCategories();
        }
    }

    back = () => {
        const { actions: { push }} = this.props;
        push(getLinkByName(PATHNAME.QUESTIONNAIRE_BANK));
    };

    submit = () => {
        const { id, name, categoryCode, questions } = this.state;
        const { actions } = this.props;
        if (!name) {
            this.setState({
                errorMessage: '问卷名不能为空！'
            });
            return;
        }
        const func = id ? 'editInquiry' : 'addInquiry';
        actions[func]({name, categoryCode, questions}, id).then(() => {
            message.success('保存成功！');
            this.back();
        }).catch(() => { message.success('保存失败！'); });
    };

    renderCategoryOptions = () => {
        const {categoryList = []} = this.props;
        return renderOptions('code', 'name')(categoryList);
    };

    getQuestionTypeName = (type) => {
        switch (type) {
        case 'SINGLE':
            return '单选题';
        case 'MULTIPLE':
            return '多选题';
        case 'TOF':
            return '判断题';
        case 'FILL':
            return '填空题';
        case 'SIMPLE':
            return '简答题';
        case 'summary':
            return '总计';
        default:
            return '';
        }
    };

    showDialog = (data, idx, e) => {
        if (e) {
            e.preventDefault();
        }
        this.setState({
            dialogVisible: true,
            dialogData: data,
            currentIdx: idx
        });
    };

    hideDialog = () => {
        this.setState({
            dialogVisible: false
        });
    };

    handleDialogChange = (data) => {
        const { questions, currentIdx, questionSummary } = this.state;
        if (currentIdx !== null) {
            questions[currentIdx] = data;
        } else {
            questions.push(data);
            questionSummary[data.type] += 1;
            questionSummary.summary += 1;
        }

        this.setState({
            questions,
            dialogVisible: false,
            questionSummary
        });
    };


    removeQuestion = (e, idx) => {
        e.preventDefault();
        const { questions, questionSummary } = this.state;
        questionSummary[questions[idx].type] -= 1;
        questionSummary.summary -= 1;
        this.setState({
            answers: questions.splice(idx, 1),
            questionSummary
        });
    };

    handleChange = (field, value) => {
        const obj = {
            errorMessage: ''
        };
        obj[field] = value;
        this.setState(obj);
    };

    render() {
        const { inquiry = {} } = this.props;
        const { name, categoryCode, questionSummary, dialogVisible, dialogData, questions, errorMessage } = this.state;
        const title = inquiry?.id ? PANEL_TITLE.INQUIRY_EDIT : PANEL_TITLE.INQUIRY_ADD;
        const questionSummaryEle = Object.keys(questionSummary).map((key) => (
            <tr key={`question-summary-${key}`}>
                <td>{this.getQuestionTypeName(key)}</td>
                <td>{questionSummary[key]}</td>
            </tr>
        ));
        return (
            <Fragment>
                <Header title={title}/>
                <div className={panelStyle.panel__body}>
                    <div className="col-md-8 col-lg-6">
                        {errorMessage && <div className="question-error"><strong >{errorMessage}</strong></div>}
                        <div className="row inputRow">
                            <label htmlFor="inquiry-name" className="col-2 text-left">问卷名称</label>
                            <div className="col-5">
                                <Input
                                    name="inquiry-name"
                                    value={name}
                                    type="text"
                                    onChange={(e) => { this.handleChange('name', e.target.value); }}
                                />
                            </div>

                        </div>
                        <div className="row inputRow">
                            <label htmlFor="inquiry-category" className="col-2 text-left">问卷种类</label>
                            <Select
                                className="col-5"
                                name="inquiry-category"
                                value={categoryCode}
                                onChange={(val) => { this.handleChange('categoryCode', val); }}
                            >
                                {this.renderCategoryOptions()}
                            </Select>
                        </div>
                        <div className="row inputRow">
                            <label htmlFor="inquiry-questions" className="col-2 text-left">问卷题目</label>
                            <div className="col-10">
                                <div>
                                    <table className="col-12 question-summary">
                                        <thead>
                                            <tr>
                                                <th>题型</th>
                                                <th>题目数量</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {questionSummaryEle}
                                        </tbody>
                                    </table>
                                    <List
                                        className="question-list"
                                        dataSource={questions}
                                        renderItem={(item, idx) => (
                                            <List.Item
                                                className={`question-answer ${(idx + 1) % 2 === 0 && 'odd'}`}
                                            >
                                                <div>
                                                    <strong>第{idx + 1}题: {item.question}</strong>
                                                    <a href="###" onClick={(e) => this.showDialog(item, idx, e)}>编辑</a>
                                                    <a href="###" onClick={(e) => this.removeQuestion(e, idx)}>删除</a>
                                                </div>
                                                { item.type !== 'TOF' && (
                                                    <div>
                                                        {item.answers.map(ans => (
                                                            <div key={`${item.question}-${ans.answer}`}>
                                                                <input type="radio" name={`${item.question}-${ans.answer}`}/>
                                                                <label htmlFor={`${item.question}-${ans.answer}`}>{ans.answer}</label>
                                                            </div>
                                                        ))}
                                                    </div>)
                                                }
                                                { item.type === 'TOF' && (
                                                    <Fragment>
                                                        <div>
                                                            <input type="radio" name={`${item.question}-yes`}/>
                                                            <label htmlFor={`${item.question}-yes`}>是</label>
                                                        </div>
                                                        <div>
                                                            <input type="radio" name={`${item.question}-no`}/>
                                                            <label htmlFor={`${item.question}-no`}>否</label>
                                                        </div>
                                                    </Fragment>
                                                )

                                                }
                                            </List.Item>
                                        )}
                                    >
                                        <List.Item>
                                            <Button onClick={() => this.showDialog(null, null)} icon="plus" type="primary" className="editable-add-btn" ghost>添加题目</Button>
                                        </List.Item>
                                    </List>
                                </div>
                            </div>
                        </div>
                        <div className="row inputRow">
                            <div className="col-12 u-text-right">
                                <Button type="secondary" onClick={this.back}>返回</Button>
                                <Button type="primary" onClick={this.submit}>保存</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <InquiryDialog
                    visible={dialogVisible}
                    data={dialogData}
                    onChange={this.handleDialogChange}
                    onHide={this.hideDialog}
                />
            </Fragment>
        );
    }
}
export default InquiryDetail;
