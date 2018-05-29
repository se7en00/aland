import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tree, Button, Modal, message } from 'antd';
import { Form, reduxForm, SubmissionError, submit } from 'redux-form';
import { sidebar, DIALOG} from 'constants';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        initialValues: {
            ...state.userList?.editUser,
            permissions: state.userList?.permissions
        }
    };
}

const TreeNode = Tree.TreeNode;
@connect(mapStateToProps)
@reduxForm({form: DIALOG.PERMISSION, enableReinitialize: true})
class PermissionDialog extends Component {
    static dialogName = DIALOG.PERMISSION;
    static propTypes = {
        hideDialog: PropTypes.func,
        handleSubmit: PropTypes.func,
        visible: PropTypes.bool,
        submitting: PropTypes.bool,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        //由于button不在form表单中， 我们采用redux-frorm的remote button，通过redux dispatch方法来来提交表单
        dispatch: PropTypes.func,
        error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        //redux-form 表单有验证错误为true, 相反为false
        invalid: PropTypes.bool,
        initialValues: PropTypes.object,
        actions: PropTypes.objectOf(PropTypes.func)
    };

    state = {checkedKeys: []}

    componentWillReceiveProps(nextProps) {
        const {permissions} = nextProps?.initialValues;
        if (permissions && permissions.length) {
            const formatPermission = permissions.map(permission => {
                const {permissionType, orderNumber, menuName} = permission;
                //orderNumber为0 表示单个类型菜单
                return permissionType !== menuName || orderNumber === 0 ? `${permissionType}-${menuName}_${orderNumber}` : '';
            }).filter(Boolean);
            this.setState({checkedKeys: formatPermission});
        } else {
            this.setState({checkedKeys: []});
        }
    }

    //渲染树
    renderAllTreeNodes = (data) => data.map((item, index) => {
        let subNodes;
        const key = item.subItems ? `${item.name}` : `${item.name}-${item.name}_0`;
        //2级菜单
        if (item.subItems) {
            subNodes = item.subItems.map((subItem, subIndex) => {
                const subItemKey = `${key}-${subItem.name}_${subIndex + 1}`;
                return <TreeNode title={subItem.name} key={subItemKey}/>;
            });
        }
        return (
            <TreeNode title={item.name} key={key}>
                {subNodes}
            </TreeNode>
        );
    });

    onCheck = (checkedKeys) => {
        this.setState({ checkedKeys });
    }

    handleSubmit = () => {
        const { id } = this.props.initialValues;
        const { updatePermissions } = this.props.actions;
        const selectedItem = this.state.checkedKeys
            .filter(item => /-/.test(item) && item !== '0-0')
            .map(item => ({
                permissionType: item.match(/\W+(?=-+)/g)[0],
                menuName: item.match(/[^-]+(?=_+)/g)[0],
                orderNumber: item.match(/\d+$/g)[0]
            }));
        //开始提交
        updatePermissions(id, {permissions: selectedItem})
            .then(() => {
                message.success('分配权限成功！');
                this.props.hideDialog(DIALOG.PERMISSION)();
            })
            .catch(error => {
                if (error?.errorMessage) {
                    throw new SubmissionError({
                        _error: error?.errorMessage
                    });
                }
            });
    }

    render() {
        const {submitting, handleSubmit, visible, hideDialog, width, dispatch, error, invalid } = this.props;
        return (
            <Modal
                visible={visible}
                width={width}
                title="菜单分配"
                onCancel={hideDialog(DIALOG.PERMISSION)}
                footer={[
                    <Button key="submit" disabled={invalid} onClick={() => dispatch(submit(DIALOG.PERMISSION))} loading={submitting} type="primary">保存</Button>,
                    <Button key="back" onClick={hideDialog(DIALOG.PERMISSION)}>取消</Button>
                ]}
            >
                <Form name="form" onSubmit={handleSubmit(this.handleSubmit)}>
                    {error && <div className="dialogContainer--error"><strong >{error}</strong></div>}
                    <Tree
                        checkable
                        showLine
                        checkedKeys={this.state.checkedKeys}
                        defaultExpandedKeys={['0-0']}
                        onCheck={this.onCheck}
                    >
                        <TreeNode title="所有" key="0-0">
                            {this.renderAllTreeNodes(sidebar)}
                        </TreeNode>
                    </Tree>
                </Form>
            </Modal>
        );
    }
}

export default PermissionDialog;
