import React from 'react';
import createFragment from 'react-addons-create-fragment';

const Dialog = (SpecifiedDialog) => (WrappedComponent) =>
    class HOCDialog extends WrappedComponent {
        state = { visible: false }

        //open dialog
        showModal = () => {
            this.setState({visible: true});
        }

        //close dialog
        hideModal = () => {
            this.setState({visible: false});
        }

        handleSubmit = () => {
            this.setState({visible: false});
        }

        //劫持定义@dialog组件渲染，为其加上弹出框
        render() {
            const props = {
                ...this.props,
                showDialog: this.showModal
            };
            const dialogProps = {
                visible: this.state.visible,
                hideDialog: this.hideModal,
                width: '650px'
            };
            const superElement = super.render();
            const NewSuperElement = React.cloneElement(superElement, props, superElement.props.children);

            if (React.isValidElement(SpecifiedDialog)) {
                const dialogElement = React.cloneElement(SpecifiedDialog, dialogProps, SpecifiedDialog.props.children);
                return createFragment({NewSuperElement, dialogElement});
            }

            return NewSuperElement;
        }
    };

export default Dialog;
