import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Table, Tabs } from 'antd';
import './TaskLessonDialog.scss';

class TaskLessonDialog extends Component {
    static propTypes = {
        onHide: PropTypes.func,
        visible: PropTypes.bool,
        onChange: PropTypes.func,
        onlineLessons: PropTypes.array,
        oneClicks: PropTypes.array
    };

    state = {
        type: 'COURSE',
        selectIds: []
    };

    handleSubmit = () => {
        const { onChange } = this.props;
        const { type, selectIds } = this.state;
        const lessons = selectIds.map(lessionId => ({
            type,
            lessionId
        }));
        onChange(lessons);
    };

    getColumns = (name) => ([{
        title: '序号',
        align: 'center',
        dataIndex: 'index',
        width: 70
    }, {
        title: '名称',
        align: 'center',
        dataIndex: name
    }, {
        title: '类别',
        align: 'center',
        dataIndex: 'category'
    }]);

    getRowSelection = () => ({
        onChange: (keys) => {
            this.setState({
                selectIds: keys
            });
        }
    });

    render() {
        const { visible, onHide, onlineLessons, oneClicks } = this.props;
        return (
            <Modal
                visible={visible}
                width={650}
                title="添加题目"
                onCancel={onHide}
                maskClosable={false}
                destroyOnClose={true}
                footer={[]}
            >
                <div className="task-lessons-dialog-action">
                    <Button key="back" onClick={onHide}>取消</Button>
                    <Button key="submit" onClick={this.handleSubmit} type="primary">保存</Button>,
                </div>
                <Tabs defaultActiveKey="COURSE" onChange={(key) => { this.setState({type: key}); }}>
                    <Tabs.TabPane tab="线上课程" key="COURSE">
                        <Table
                            rowClassName="task-lessons-dialog-row"
                            columns={this.getColumns('name')}
                            dataSource={onlineLessons}
                            rowSelection={this.getRowSelection()}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="一点通" key="PEDIA">
                        <Table
                            rowClassName="task-lessons-dialog-row"
                            columns={this.getColumns('subject')}
                            dataSource={oneClicks}
                            rowSelection={this.getRowSelection()}
                        />
                    </Tabs.TabPane>
                </Tabs>

            </Modal>
        );
    }
}

export default TaskLessonDialog;
