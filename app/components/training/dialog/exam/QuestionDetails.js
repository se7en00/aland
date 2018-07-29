import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import classnames from 'classnames';
import { Timeline, Tag, Icon } from 'antd';
import { EXAM_TYPE_MAPPING } from 'constants';
import style from './QuestionDetails.scss';

class QuestionDetails extends Component {
    renderQuestion = () => {
        const {dataSource} = this.props;
        const {type, answer, answers} = dataSource;
        switch (type) {
        case 'FILL':
            return (
                <Timeline>
                    <Timeline.Item>{answer}</Timeline.Item>
                </Timeline>
            );
        case 'TOF': //eslint-disable-line
            const isTrue = !!+answer;
            return (
                <Timeline>
                    <Timeline.Item dot={isTrue ?
                        <Icon type="check-circle-o" style={{fontSize: '16px', color: '#5DA424'}}/>
                        : <Icon type="close-circle-o" style={{fontSize: '16px', color: '#f5222d'}}/>}>
                        {isTrue ? '对的' : '错的'}
                    </Timeline.Item>
                </Timeline>
            );
        default:
            return (
                <Timeline>
                    {answers.map((item, index) => {
                        const isCorrect = !!+item.isCorrect;//eslint-disable-line
                        const answerName = `${String.fromCharCode(97 + index).toUpperCase()} ${item.answer}`;
                        if (isCorrect) {
                            return (
                                <Timeline.Item
                                    color="#5DA424"
                                    key={uuid()}
                                    dot={<Icon type="check-circle-o" style={{fontSize: '16px', color: '#5DA424'}}/>}
                                >
                                    {answerName}
                                </Timeline.Item>
                            );
                        }
                        return (
                            <Timeline.Item
                                color="#2db7f5"
                                key={uuid()}
                            >
                                {answerName}
                            </Timeline.Item>
                        );
                    })}
                </Timeline>
            );
        }
    }

    render() {
        const {dataSource: {question, type}} = this.props;
        const questionContainerClassName = classnames('row', style.questionContainer);
        const questionClassName = style.questionContainer__questionName;
        return (
            <div className={questionContainerClassName}>
                <div className={questionClassName}>
                    <h3>{question}</h3>
                    <Tag color="volcano">{EXAM_TYPE_MAPPING[type]}</Tag>
                </div>
                {this.renderQuestion()}
            </div>
        );
    }
}

QuestionDetails.propTypes = {
    dataSource: PropTypes.object
};

export default QuestionDetails;

