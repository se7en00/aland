import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import panelStyle from 'layout/main/Main.scss';
import { Button } from 'antd';
import { PANEL_TITLE, PATHNAME, getLinkByName, BASE_URL } from 'constants';
import Header from '../shared/panel/PanelHeader';
import './LecturersDetail.scss';

class LecturersDetail extends Component {
    static propTypes = {
        lecturer: PropTypes.object,
        actions: PropTypes.object
    };

    componentDidMount() {
        const { lecturer, actions: { getLecturer } } = this.props;
        if (/detail$/g.test(location.pathname) && !lecturer) {
            const id = location.pathname.match(/(\w)+(?=\/detail$)/g)[0];
            if (id) {
                getLecturer(id);
            }
        }
    }

    back = () => {
        const { actions: { push }} = this.props;
        push(getLinkByName(PATHNAME.MASTER));
    };

    redirectEdit = () => {
        const { lecturer: { id }, actions: { push } } = this.props;
        push(`${getLinkByName(PATHNAME.MASTER)}/${id}/edit`);
    };

    render() {
        const { lecturer = {} } = this.props;
        const { name, avatarUrl, gender, type, level, introduce } = lecturer;
        const domain = new URL(BASE_URL).origin;
        const avatar = `${domain}/uploads${avatarUrl}`;
        return (
            <Fragment>
                <Header title={PANEL_TITLE.MASTER_DETAIL}/>
                <div className={panelStyle.panel__body}>
                    <div className="col-md-8 col-lg-6">
                        <p>基本信息</p>
                        <div className="lecturer-detail">
                            <img src={avatar} width={100} height={100} alt="img"/>
                            <div className="lecturer-info">
                                <p>{name}</p>
                                <div>
                                    <text>{gender}</text>
                                    <text>{type}</text>
                                    <text>{level}</text>
                                </div>
                            </div>
                            {/*eslint-disable-next-line*/}
                            <p dangerouslySetInnerHTML={{__html: introduce}}/>
                            <div className="row inputRow">
                                <div className="col-12 u-text-right">
                                    <Button type="primary" onClick={this.redirectEdit}>编辑</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p>授课记录</p>
                
            </Fragment>
        );
    }
}
export default LecturersDetail;
