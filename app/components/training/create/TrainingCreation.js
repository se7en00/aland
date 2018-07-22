import React, { Component, Fragment } from 'react';
import { PANEL_TITLE, PATHNAME, getLinkByName } from 'constants';
import PropTypes from 'prop-types';
// import { paginationSetting } from 'utils';
import panelStyle from 'layout/main/Main.scss';
import Header from '../../shared/panel/PanelHeader';
import TrainingTabs from './TrainingTabs';


class TrainingCreation extends Component {
    static propTypes = {
        showDialog: PropTypes.func,
        actions: PropTypes.objectOf(PropTypes.func),
        trainings: PropTypes.object
    };

    componentDidMount() {
        this.props.actions.getCourseDirections();
    }

    redirect = () => {
        const {resetDraftLessons, push} = this.props.actions;
        resetDraftLessons();
        push(`${getLinkByName(PATHNAME.ONLINE_LESSONS)}/additionLesson`);
    }

    render() {
        const {trainings, actions, showDialog} = this.props;
        return (
            <Fragment>
                <Header title={PANEL_TITLE.TRAINING_LIST_ADD}/>
                <div className={panelStyle.panel__body}>
                    <TrainingTabs trainings={trainings} actions={actions} showDialog={showDialog}/>
                </div>
            </Fragment>
        );
    }
}

export default TrainingCreation;
