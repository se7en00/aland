import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Modal, List } from 'antd';

class NewsReceiverDialog extends Component {
    static propTypes = {
        onHide: PropTypes.func,
        visible: PropTypes.bool,
        data: PropTypes.array,
        type: PropTypes.string
    };

    getCurrentType = () => {
        const { type } = this.props;
        if (type == 0) {
            return '全体';
        } 
        return '个人/群组';
    };

    render() {
        const { visible, onHide, data } = this.props;
        console.log(data)
        return (
            <Modal
                visible={visible}
                width={650}
                title="接收人列表"
                onCancel={onHide}
                maskClosable={false}
                destroyOnClose={true}
                footer={[]}
            >
                <p>当前的接收人类型为: { this.getCurrentType() }</p>
                <List
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                          <List.Item.Meta
                           title={item.name}
                          />
                        </List.Item>
                      )}
                />
            </Modal>
        );
    }
}
export default NewsReceiverDialog;
