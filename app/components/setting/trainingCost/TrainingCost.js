import React, { Component, Fragment } from 'react';
import { PATHNAME, TRAINING_COST_CATEGORY } from 'constants';
import PropTypes from 'prop-types';
// import { paginationSetting } from 'utils';
import { Collapse } from 'antd';
import panelStyle from 'layout/main/Main.scss';
import Header from '../../shared/panel/PanelHeader';
import TrainingCostGroup from './TrainingCostGroup';
import style from './TrainingCost.scss';

class TrainingCost extends Component {
    static propTypes = {
        // showDialog: PropTypes.func
        actions: PropTypes.objectOf(PropTypes.func),
        setting: PropTypes.object
    };

    componentDidMount() {
        this.props.actions.getTrainings();
        this.props.actions.getCosts();
    }

    handleCollapseChange = (key) => {
        this.props.actions.setActivePanel(key);
    }

    renderCategoriesPanel = () => {
        const {actions, setting} = this.props;
        const Panel = Collapse.Panel;
        return Object.keys(TRAINING_COST_CATEGORY).map((item, index) => {
            let list;
            const key = `${item}${index}`;
            if (item === 'TRAINING_TYPE') {
                list = setting?.trainingTypes || [];
            } else {
                list = setting?.costTypes || [];
            }
            return (<Panel header={TRAINING_COST_CATEGORY[item]} key={key} className={style.tagCollapse__panel}>
                <TrainingCostGroup actions={actions} list={list} type={item}/>
            </Panel>);
        });
    }

    render() {
        const {setting} = this.props;
        const actives = setting?.actives || [];
        return (
            <Fragment>
                <Header title={PATHNAME.TRAINING_AND_COST}/>
                <div className={panelStyle.panel__body}>
                    <Collapse className={style.tagCollapse} defaultActiveKey={actives} onChange={this.handleCollapseChange}>
                        {this.renderCategoriesPanel()}
                    </Collapse>
                </div>
            </Fragment>
        );
    }
}

export default TrainingCost;
