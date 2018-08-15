import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DIALOG, PATHNAME } from 'constants';
import { paginationSetting } from 'utils';
import { Button } from 'antd';
import panelStyle from '../../../layout/main/Main.scss';
import Header from '../../shared/panel/PanelHeader';

class PictureList extends Component {
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
        const {setting: {pictureList}} = this.props;
        console.log(pictureList);
        return (
            <div>
                <Header title={PATHNAME.PICTURE}/>
                <div className={panelStyle.panel__body}>
                    <Button onClick={this.openCreateDialog} type="primary" className="editable-add-btn u-pull-down-md" ghost>添加</Button>
                </div>
            </div>
        );
    }
}

export default PictureList;
