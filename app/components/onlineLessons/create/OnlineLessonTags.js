import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Button } from 'antd';

class OnlineLessonTags extends Component {
    render() {
        return (
            <div className="row inputRow">
                <div className="col-md-8 col-lg-6">
                    <Button name="sectionButton" type="primary" ghost>添加标签</Button>
                </div>
            </div>
        );
    }
}

OnlineLessonTags.propTypes = {};
OnlineLessonTags.defaultProps = {};

export default OnlineLessonTags;
