import React, { Component, Fragment } from 'react';
import { PANEL_TITLE } from 'constants';
import PropTypes from 'prop-types';
import { format } from 'utils';
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
        const {trainings, actions: {getTrainingDetails, getALLAssociations}} = this.props;
        if (/details$/g.test(location.pathname) && !trainings?.isEditable) {
            const trainingId = location.pathname.match(/(\w)+(?=\/details$)/g)[0];
            if (trainingId) {
                getTrainingDetails(trainingId);
            }
        }
        getALLAssociations();
    }

    renderHeaderTitle = () => {
        const {trainings} = this.props;
        if (trainings?.isEditable) {
            return format(PANEL_TITLE.TRAINING_DETAILS, trainings?.trainingDetails?.title || '培训信息');
        }
        return PANEL_TITLE.TRAINING_LIST_ADD;
    }

    render() {
        const {trainings, actions, showDialog} = this.props;
        const title = this.renderHeaderTitle();
        return (
            <Fragment>
                <Header title={title}/>
                <div className={panelStyle.panel__body}>
                    <TrainingTabs trainings={trainings} actions={actions} showDialog={showDialog}/>
                </div>
            </Fragment>
        );
    }
}

export default TrainingCreation;
