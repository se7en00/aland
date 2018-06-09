import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { courseStatusOptions } from 'constants';
import PropTypes from 'prop-types';
import { Button, Icon, Select } from 'antd';
import { renderTextField, renderSelectField, renderDateRangeField } from '../shared/form';


@reduxForm({form: 'coursesSearch'})
class OnlineLessonsSearch extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        submitting: PropTypes.bool
        // error: PropTypes.string
    };

    render() {
        const Option = Select.Option;
        const { submitting, handleSubmit } = this.props;
        return (
            <div>
                <form name="form" onSubmit={handleSubmit}>
                    <div className="row">

                        <Field
                            layout="elementOnly"
                            name="name"
                            rowClassName="col-md-2"
                            component={renderTextField}
                            type="text"
                            prefix={<Icon type="search"/>}
                            placeholder="关键字"
                        />

                        <Field
                            layout="elementOnly"
                            name="courseStatus"
                            rowClassName="col-md-2"
                            component={renderSelectField}
                            placeholder="状态">
                            {courseStatusOptions}
                        </Field>

                        <Field
                            layout="elementOnly"
                            name="lecturer"
                            rowClassName="col-md-2"
                            component={renderSelectField}
                            placeholder="课程讲师">
                            <Option value="jack">Jack</Option>
                        </Field>

                        <Field
                            layout="elementOnly"
                            name="category"
                            rowClassName="col-md-2"
                            component={renderSelectField}
                            placeholder="标签">
                            <Option value="jack">Jack</Option>
                        </Field>

                        <Field
                            layout="elementOnly"
                            name="dateTime"
                            rowClassName="col-md-3"
                            component={renderDateRangeField}
                        />

                        <Button
                            htmlType="submit"
                            loading={submitting}
                            className="col-md-1"
                            type="primary">
                            搜索
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default OnlineLessonsSearch;
