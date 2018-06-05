import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import panelStyle from 'layout/main/Main.scss';
import { PANEL_TITLE } from 'constants';
import Header from '../../shared/panel/PanelHeader';
import CreateDetails from './OnlineLessonsCreateDetails';

class OnlineLessonsCreate extends Component {
    render() {
        return (
            <Fragment>
                <Header title={PANEL_TITLE.ONLINE_LESSONS_ADD}/>
                <div className={panelStyle.panel__body}>
                    <CreateDetails showDialog={this.props.showDialog}/>
                </div>
            </Fragment>
        );
    }
}
OnlineLessonsCreate.propTypes = {
    showDialog: PropTypes.func
};

export default OnlineLessonsCreate;
