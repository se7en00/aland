import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DIALOG, PATHNAME } from 'constants';
import { paginationSetting } from 'utils';
import { Button } from 'antd';
import panelStyle from '../../../layout/main/Main.scss';
import Header from '../../shared/panel/PanelHeader';
import SecurityTable from './SecurityTable';

class SecurityList extends Component {
    static propTypes = {
        showDialog: PropTypes.func,
        actions: PropTypes.objectOf(PropTypes.func),
        setting: PropTypes.object
    };

    componentDidMount() {
        this.props.actions.getList({pageSize: paginationSetting.pageSize, dicType: 'LIMIT_TYPE'});
    }

    openCreateDialog = () => {
        const {showDialog} = this.props;
        showDialog(DIALOG.SECURITY_SETTING)();
    };

    render() {
        const {setting: {list}, actions, showDialog} = this.props;
        return (
            <div>
                <Header title={PATHNAME.SECURITY_PERMISSION_CATEGORY}/>
                <div className={panelStyle.panel__body}>
                    <Button onClick={this.openCreateDialog} type="primary" className="editable-add-btn u-pull-down-md" ghost>添加</Button>
                    <SecurityTable dataSource={list} actions={actions} showDialog={showDialog}/>
                </div>
            </div>
        );
    }
}

export default SecurityList;
