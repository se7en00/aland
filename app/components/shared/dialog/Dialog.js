import React from 'react';
import createFragment from 'react-addons-create-fragment';

const Dialog = (...dialogs) => (WrappedComponent) =>
    class HOCDialog extends WrappedComponent {
        //初始各个dialog的状态
        preLoadState = () => dialogs?.reduce((result, dialogModal) => {
            const dialogName = dialogModal?.type?.dialogName || 'dialog';

            result[dialogName] = false;
            return result;
        }, {})

        state = {...this.preLoadState(), title: ''};

        //open dialog
        showModal = (dialogName = 'dialog', title) => () => {
            this.setState({[dialogName]: true, title});
        }

        //close dialog
        hideModal = (dialogName = 'dialog') => () => {
            this.setState({[dialogName]: false});
        }

        //劫持定义@dialog组件渲染，为其加上弹出框
        render() {
            const props = {
                // ...this.props,
                showDialog: this.showModal
            };

            let dialogProps = {
                hideDialog: this.hideModal,
                width: '650px',
                title: this.state.title
            };

            // //mapPropsToDialog的用处：当我们打开dilaog时， mapPropsToDialog里的数据可以让我们在dialog里初始化一些相关联的数据
            // if (this.props?.mapPropsToDialog) {
            //     Object.assign(dialogProps, this.props.mapPropsToDialog);
            // }

            const superElement = super.render();
            const NewSuperElement = React.cloneElement(superElement, props, superElement.props.children);

            //更新dialog所需的属性
            const DialogElements = dialogs.reduce((result, dialog, index) => {
                if (React.isValidElement(dialog)) {
                    dialogProps = {
                        ...dialogProps,
                        actions: this.props.actions, //注入父组件的action creator
                        visible: this.state[dialog?.type?.dialogName || 'dialog']
                    };
                    result[`dialog_${index}`] = React.cloneElement(dialog, dialogProps, dialog.props.children);
                }
                return result;
            }, {});

            //注入dialog
            return createFragment({NewSuperElement, ...DialogElements});
        }
    };

export default Dialog;
