import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PANEL_TITLE } from 'constants';
import panelStyle from '../../layout/main/Main.scss';
import Header from '../shared/panel/PanelHeader';
import OrgListTable from './OrgListTable';

class OrgList extends Component {
    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func),
        org: PropTypes.object
    };

    componentDidMount() {
        this.props.actions.getOrgList();
    }

    render() {
        const {org: {list}, actions} = this.props;
        return (
            <div>
                <Header title={PANEL_TITLE.ORG_LIST}/>
                <div className={panelStyle.panel__body}>
                    <OrgListTable dataSource={list} actions={actions}/>
                </div>
            </div>
        );
    }
}

export default OrgList;
