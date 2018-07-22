import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DIALOG, PATHNAME } from 'constants';
import { paginationSetting } from 'utils';
import { Button } from 'antd';
import panelStyle from '../../layout/main/Main.scss';
import Header from '../shared/panel/PanelHeader';
import CourseDirectionTable from './CourseDirectionTable';

class CourseDirectionList extends Component {
    static propTypes = {
        showDialog: PropTypes.func,
        actions: PropTypes.objectOf(PropTypes.func),
        courserDirection: PropTypes.object
    };

    componentDidMount() {
        this.props.actions.getCourseDirectionList({pageSize: paginationSetting.pageSize});
    }

    openCreateDialog = () => {
        const {showDialog} = this.props;
        showDialog(DIALOG.CREATE_USER_GROUP)();
    };

    render() {
        const {courserDirection: {list}, actions, showDialog} = this.props;
        return (
            <div>
                <Header title={PATHNAME.LESSONS_DIRECTION_SETTING}/>
                <div className={panelStyle.panel__body}>
                    <Button onClick={this.openCreateDialog} type="primary" className="editable-add-btn u-pull-down-md" ghost>添加</Button>
                    <CourseDirectionTable dataSource={list} actions={actions} showDialog={showDialog}/>
                </div>
            </div>
        );
    }
}

export default CourseDirectionList;
