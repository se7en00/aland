import React, { Component, Fragment } from 'react';
import { PATHNAME, TRAINING_COST_CATEGORY } from 'constants';
// import PropTypes from 'prop-types';
// import { paginationSetting } from 'utils';
import uuid from 'uuid/v4';
import { Collapse } from 'antd';
import panelStyle from 'layout/main/Main.scss';
import Header from '../../shared/panel/PanelHeader';
import TrainingCostGroup from './TrainingCostGroup';
import style from './TrainingCost.scss';

class TrainingCost extends Component {
    static propTypes = {
        // showDialog: PropTypes.func
        // actions: PropTypes.objectOf(PropTypes.func),
        // onlineLessons: PropTypes.object
    };

    renderCategoriesPanel = () => {
        const Panel = Collapse.Panel;
        return Object.keys(TRAINING_COST_CATEGORY).map((item) => (
            <Panel header={TRAINING_COST_CATEGORY[item]} key={uuid()} className={style.tagCollapse__panel}>
                <TrainingCostGroup/>
            </Panel>
        ));
    }

    render() {
        // const {onlineLessons: {list}, actions} = this.props;
        return (
            <Fragment>
                <Header title={PATHNAME.TRAINING_AND_COST}/>
                <div className={panelStyle.panel__body}>
                    <Collapse className={style.tagCollapse}>
                        {this.renderCategoriesPanel()}
                    </Collapse>
                </div>
            </Fragment>
        );
    }
}

export default TrainingCost;
