import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { DIALOG } from 'constants';
import { Button } from 'antd';
import HomeWorkTable from './HomeWorkTable';

class HomeWork extends Component {
    static propTypes = {
        showDialog: PropTypes.func,
        point: PropTypes.object,
        actions: PropTypes.objectOf(PropTypes.func)
    }

    onCreateHomeWork = (title, type) => {
        const {actions: {editHomeWork}, showDialog} = this.props;
        editHomeWork(type);
        showDialog(DIALOG.HOME_WORK, title)();
    }

    onCreateInteractionWork = () => {
        const {showDialog, actions: {editHomeWork}} = this.props;
        editHomeWork('INTERACTION');
        showDialog(DIALOG.INTERACTION_WORK)();
    }

    render() {
        const { showDialog, point, actions } = this.props;
        const hasHomeWork = point?.homeWorks?.elements && point?.homeWorks?.elements?.length > 0;
        return (
            <Fragment>
                <div className="row inputRow">
                    <div className="col-md-8 col-lg-6">
                        <Button htmlType="button" onClick={() => this.onCreateHomeWork('文字写作', 'WRITE')} type="primary" ghost>文字写作</Button>
                        <Button htmlType="button" onClick={() => this.onCreateHomeWork('动手作业', 'PRACTICE')} type="primary" ghost>手动作业</Button>
                        <Button htmlType="button" onClick={this.onCreateInteractionWork} type="primary" ghost>人际互动</Button>
                    </div>
                </div>
                {
                    hasHomeWork &&
                    <HomeWorkTable
                        courseId={point?.pointContent?.courseId}
                        actions={actions}
                        showDialog={showDialog}
                        dataSource={point.homeWorks.elements}/>
                }
            </Fragment>

        );
    }
}

export default HomeWork;
