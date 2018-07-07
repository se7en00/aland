import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import panelStyle from 'layout/main/Main.scss';
import { PANEL_TITLE } from 'constants';
import { Tabs, Icon } from 'antd';
import Header from '../../shared/panel/PanelHeader';
import OneClickBase from './OneClickBase';

class OneClickDetail extends Component {
    componentDidMount() {
        const { oneClick: { oneClick }, actions: { getOneClick } } = this.props;
        if (/detail$/g.test(location.pathname) && !oneClick) {
            const id = location.pathname.match(/(\w)+(?=\/detail$)/g)[0];
            if (id) {
                getOneClick(id);
            }
        }
    }

    render() {
        const { actions: { editOneClick }, oneClick: { oneClick } } = this.props;
        const TabPane = Tabs.TabPane;
        return (
            <Fragment>
                <Header title={PANEL_TITLE.ONE_CLICK_DETAIL}/>
                <div className={panelStyle.panel__body}>
                    <Tabs defaultActiveKey="1" onChange={this.handleChange} tabBarExtraContent={this.reviewOperation}>
                        <TabPane tab={<span><Icon type="profile"/>基本信息</span>} key="1">
                            <OneClickBase
                                {...this.props}
                                initialValues={oneClick}
                                handleSave={editOneClick}
                            />
                        </TabPane>
                        <TabPane
                            disabled={true}
                            tab={<span>正文内容</span>}
                            key="2">
                            <Fragment/>
                        </TabPane>
                        <TabPane
                            disabled={true}
                            tab={<span>学习资料</span>}
                            key="3">
                            <Fragment/>
                        </TabPane>
                        <TabPane
                            disabled={true}
                            tab={<span>测试题</span>}
                            key="4">
                            <Fragment/>
                        </TabPane>
                        <TabPane
                            disabled={true}
                            tab={<span>下载资料</span>}
                            key="5">
                            <Fragment/>
                        </TabPane>
                        <TabPane
                            disabled={true}
                            tab={<span>课内作业</span>}
                            key="6">
                            <Fragment/>
                        </TabPane>
                        <TabPane
                            disabled={true}
                            tab={<span>补充资料</span>}
                            key="7">
                            <Fragment/>
                        </TabPane>
                        <TabPane
                            disabled={true}
                            tab={<span>关联记录</span>}
                            key="8">
                            <Fragment/>
                        </TabPane>
                        <TabPane
                            disabled={true}
                            tab={<span>学习社群</span>}
                            key="9">
                            <Fragment/>
                        </TabPane>
                        <TabPane
                            disabled={true}
                            tab={<span>版本更新</span>}
                            key="10">
                            <Fragment/>
                        </TabPane>
                    </Tabs>
                </div>
            </Fragment>
        );
    }
}
OneClickDetail.propTypes = {
    actions: PropTypes.object,
    oneClick: PropTypes.object
};

export default OneClickDetail;
