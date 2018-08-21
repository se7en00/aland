import React, { Component, Fragment } from 'react';
import { PATHNAME, TRAINING_COST_CATEGORY } from 'constants';
// import PropTypes from 'prop-types';
// import { paginationSetting } from 'utils';
import uuid from 'uuid/v4';
import { Collapse } from 'antd';
import panelStyle from 'layout/main/Main.scss';
import Header from '../../shared/panel/PanelHeader';
import LecturerGroup from './LecturerGroup';
import style from './LecturerSetting.scss';

class LecturerSetting extends Component {
    static propTypes = {
        // showDialog: PropTypes.func
        // actions: PropTypes.objectOf(PropTypes.func),
        // onlineLessons: PropTypes.object
    };

    renderCategoriesPanel = () => {
        const Panel = Collapse.Panel;
        return Object.keys(TRAINING_COST_CATEGORY).map((item) => (
            <Panel header={TRAINING_COST_CATEGORY[item]} key={uuid()} className={style.tagCollapse__panel}>
                <LecturerGroup/>
            </Panel>
        ));
    }

    render() {
        // const {onlineLessons: {list}, actions} = this.props;
        return (
            <Fragment>
                <Header title={PATHNAME.LECTURER_LEVEL}/>
                <div className={panelStyle.panel__body}>
                    <LecturerGroup/>
                </div>
            </Fragment>
        );
    }
}

export default LecturerSetting;
