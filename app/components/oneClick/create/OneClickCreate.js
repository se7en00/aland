import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import panelStyle from 'layout/main/Main.scss';
import { PANEL_TITLE } from 'constants';
import Header from '../../shared/panel/PanelHeader';
import OneClickBase from './OneClickBase';

class OneClickCreate extends Component {
    render() {
        const { actions: { addOneClick } } = this.props;
        return (
            <Fragment>
                <Header title={PANEL_TITLE.ONE_CLICK_ADD}/>
                <div className={panelStyle.panel__body}>
                    <OneClickBase
                        {...this.props}
                        handleSave={addOneClick}
                    />
                </div>
            </Fragment>
        );
    }
}
OneClickCreate.propTypes = {
    actions: PropTypes.object
};

export default OneClickCreate;
