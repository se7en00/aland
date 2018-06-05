import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { paginationSetting } from 'utils';
import { getLinkByName, PANEL_TITLE, PATHNAME } from 'constants';
import panelStyle from 'layout/main/Main.scss';
import Header from '../shared/panel/PanelHeader';
import OneClickSearch from './OneClickSearch';
import OneClickTable from './OneClickTable';


class OneClickList extends Component {
    componentDidMount() {
        this.props.actions.getOneClickList(paginationSetting.pageSize);
    }

    redirect = () => {
        this.props.actions.push(`${getLinkByName(PATHNAME.ONE_CLICK)}/add`);
    }

    render() {
        const {oneClick: {list}, actions} = this.props;
        return (
            <Fragment>
                <Header title={PANEL_TITLE.ONE_CLICK}/>
                <div className={panelStyle.panel__body}>
                    <OneClickSearch/>
                    <Button onClick={this.redirect} type="primary" className="editable-add-btn u-pull-down-md" ghost>新增一点通</Button>
                    <OneClickTable dataSource={list} actions={actions}/>
                </div>
            </Fragment>
        );
    }
}

OneClickList.propTypes = {
    actions: PropTypes.objectOf(PropTypes.func),
    oneClick: PropTypes.object
};

export default OneClickList;
