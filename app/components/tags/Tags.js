import React, { Component, Fragment } from 'react';
import { PANEL_TITLE, TAG_CATEGORY } from 'constants';
// import PropTypes from 'prop-types';
// import { paginationSetting } from 'utils';
import uuid from 'uuid/v4';
import { Collapse } from 'antd';
import panelStyle from 'layout/main/Main.scss';
import Header from '../shared/panel/PanelHeader';
import TagGroup from './TagGroup';
import style from './Tags.scss';

class Tags extends Component {
    static propTypes = {
        // showDialog: PropTypes.func
        // actions: PropTypes.objectOf(PropTypes.func),
        // onlineLessons: PropTypes.object
    };

    renderCategoriesPanel = () => {
        const Panel = Collapse.Panel;
        return Object.keys(TAG_CATEGORY).map((item) => (
            <Panel header={TAG_CATEGORY[item]} key={uuid()} className={style.tagCollapse__panel}>
                <TagGroup/>
            </Panel>
        ));
    }

    render() {
        // const {onlineLessons: {list}, actions} = this.props;
        return (
            <Fragment>
                <Header title={PANEL_TITLE.TAGS}/>
                <div className={panelStyle.panel__body}>
                    <Collapse className={style.tagCollapse}>
                        {this.renderCategoriesPanel()}
                    </Collapse>
                </div>
            </Fragment>
        );
    }
}

export default Tags;
