import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tree, Button, Modal } from 'antd';
import {sidebar} from 'constants';

const TreeNode = Tree.TreeNode;
class PermissionDialog extends PureComponent {
    static dialogName = 'permission';
    static propTypes = {
        hideDialog: PropTypes.func,
        handleSubmit: PropTypes.func,
        visible: PropTypes.bool,
        submitting: PropTypes.bool,
        width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        // error: PropTypes.string
    };

    renderAllTreeNodes = (data) => data.map((item, index) => {
        let subNodes;
        const key = `0-0-${index}`;
        //2级菜单
        if (item.subItems) {
            subNodes = item.subItems.map((subItem, subIndex) => {
                const subItemKey = `${key}-${subIndex}`;
                return <TreeNode title={subItem.name} key={subItemKey}/>;
            });
        }
        return (
            <TreeNode title={item.name} key={key}>
                {subNodes}
            </TreeNode>
        );
    });

    render() {
        const {submitting, handleSubmit, visible, hideDialog, width} = this.props;
        return (
            <form name="form" onSubmit={handleSubmit}>
                <Modal
                    visible={visible}
                    width={width}
                    title="菜单分配"
                    onCancel={hideDialog('permission')}
                    footer={[
                        <Button key="submit" loading={submitting} type="primary">保存</Button>,
                        <Button key="back" onClick={hideDialog('permission')}>取消</Button>
                    ]}
                >
                    <Tree
                        checkable
                        showLine
                        defaultExpandedKeys={['0-0']}
                        onSelect={this.onSelect}
                    >
                        <TreeNode title="所有" key="0-0">
                            {this.renderAllTreeNodes(sidebar)}
                        </TreeNode>
                    </Tree>
                </Modal>
            </form>
        );
    }
}

export default PermissionDialog;
