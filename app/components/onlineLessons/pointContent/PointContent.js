import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import panelStyle from 'layout/main/Main.scss';
import { PANEL_TITLE } from 'constants';
import Header from '../../shared/panel/PanelHeader';
import PointContentTab from './PointContentTab';


class PointContent extends Component {
    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func),
        match: PropTypes.object,
        showDialog: PropTypes.func,
        point: PropTypes.object
    }

    componentDidMount() {
        const {match, actions: {getPointContent}} = this.props;
        const {lessonId, pointId} = match.params;
        getPointContent(lessonId, pointId);
    }

    render() {
        const {point, actions, showDialog} = this.props;
        return (
            <Fragment>
                <Header title={PANEL_TITLE.ONLINE_LESSONS_POINT}/>
                <div className={panelStyle.panel__body}>
                    <PointContentTab point={point} actions={actions} showDialog={showDialog}/>
                </div>
            </Fragment>
        );
    }
}

export default PointContent;
