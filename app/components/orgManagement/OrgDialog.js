import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Transfer, message } from 'antd';
import { DIALOG } from 'constants';
import {connect} from 'react-redux';
import style from './OrgDialog.scss';

@connect(state => ({org: state.org}))
class OrgDialog extends Component {
    static dialogName = DIALOG.ORG;

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            selected: [],
            data: []
        };
    }

    static propTypes = {
        hideDialog: PropTypes.func,
        actions: PropTypes.objectOf(PropTypes.func),
        visible: PropTypes.bool,
        submitting: PropTypes.bool,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        org: PropTypes.object
    };

    componentWillReceiveProps(nextProps) {
        const { org } = nextProps;
        if (org) {
            const { users = [], associatedUsers = [] } = org;
            if (users !== this.props.org?.users || associatedUsers !== this.props.org?.associatedUsers) {
                this.setState({
                    selected: associatedUsers.map(item => item.userId),
                    data: users.map(user => ({
                        key: user.id,
                        title: user.name
                    }))
                });
            }
        }
    }

    handleSubmit = () => {
        const { org: { dept }, actions: { saveAssociatedUsers }, hideDialog } = this.props;
        const { selected } = this.state;
        saveAssociatedUsers(dept.id, dept.type, selected).then(() => {
            message.success('保存成功！');
            hideDialog(DIALOG.ORG)();
        }).catch(() => {message.success('保存失败！');});
    };

    handleChange = (targetKeys) => {
        this.setState({ selected: targetKeys });
    }


    render() {
        const {submitting, visible, hideDialog, width } = this.props;
        const { selected, data } = this.state;
        return (
            <Modal
                visible={visible}
                width={width}
                title="选择人员"
                onCancel={hideDialog(DIALOG.ORG)}
                footer={[
                    <Button key="submit" loading={submitting} type="primary" onClick={this.handleSubmit}>确定</Button>,
                    <Button key="back" onClick={hideDialog(DIALOG.ORG)}>取消</Button>
                ]}
            >
                <Transfer
                    className={style['org-panel']}
                    dataSource={data}
                    targetKeys={selected}
                    onChange={this.handleChange}
                    render={item => item.title}
                    operations={['添加', '删除']}
                />
            </Modal>
        );
    }
}

export default OrgDialog;
