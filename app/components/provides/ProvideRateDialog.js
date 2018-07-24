import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, List, Rate } from 'antd';

class ProvideRateDialog extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static propTypes = {
        hideDialog: PropTypes.func,
        handleSubmit: PropTypes.func,
        visible: PropTypes.bool,
        relativeId: PropTypes.string,
        data: PropTypes.object
    };

    state = {
        rate: {},
        rateText: {}
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.visible !== this.props.visible) {
            this.setState({
                rate: {},
                rateText: {}
            });
        }
    }

    handleSubmit = () => {
        const { handleSubmit, data: { id, questions }, relativeId } = this.props;
        const { rate } = this.state;
        const userAnswers = Object.keys(rate).filter(i => rate[i]).map(item => {
            const { answers } = questions.find(q => q.id === item);
            const answer = answers[rate[item] - 1].answer;
            return {
                inquiryQuestionId: item,
                answer
            };
        });
        handleSubmit({
            userId: JSON.parse(localStorage.user).id,
            relativeId,
            inquiryId: id,
            userAnswers
        });
    };

    handleRateHover = (value, item) => {
        const { rateText } = this.state;
        let text = '';
        if (value) {
            text = item.answers[value - 1].answer;
        }
        rateText[item.id] = text;
        this.setState({
            rateText
        });
    };

    handleRateChange = (value, item) => {
        const { rate } = this.state;
        rate[item.id] = value;
        this.setState({
            rate
        });
    };

    // handleRateBlur = () => {
    //     const { data: { questions } } = this.props;
    //     const { rate } = this.state;
    //     const rateText = Object.keys(rate).filter(k => rate[k]).reduce((prev, next) => {
    //         const { answers } = questions.find(q => q.id === next);
    //         prev[next] = answers[rate[next] - 1].answer;
    //         return prev;
    //     }, {});
    //     this.setState({
    //         rateText
    //     });
    // };

    render() {
        const {hideDialog, visible, data = {} } = this.props;
        const { name = '', questions = [] } = data;
        const { rate, rateText } = this.state;
        const rateData = questions.filter(q => q.type === 'MARK');
        return (
            <Modal
                visible={visible}
                width={800}
                title="评分"
                onCancel={hideDialog}
                footer={[
                    <Button key="submit" onClick={this.handleSubmit} type="primary">保存</Button>,
                    <Button key="back" onClick={hideDialog}>取消</Button>
                ]}
            >
                <div>
                    <List
                        dataSource={rateData}
                        header={(
                            /*eslint-disable-next-line*/
                            <p dangerouslySetInnerHTML={{__html: name}}/>
                        )}
                        renderItem={item => (
                            <div className="row">
                                {/*eslint-disable-next-line*/}
                                <p className="col-6" dangerouslySetInnerHTML={{__html: item.question}}/>
                                <Rate
                                    className="col-3"
                                    allowClear={true}
                                    defaultValue={0}
                                    value={rate[item.id] || 0}
                                    count={item.answers?.length}
                                    onChange={(val) => this.handleRateChange(val, item)}
                                    onHoverChange={(val) => this.handleRateHover(val, item)}
                                    // onBlur={this.handleRateBlur}
                                />
                                {/*eslint-disable-next-line*/}
                                <p className="col-3" dangerouslySetInnerHTML={{__html: rateText[item.id] || ''}}/>
                            </div>
                        )}
                    />
                </div>
            </Modal>
        );
    }
}

export default ProvideRateDialog;
