import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Button, Icon, Select } from 'antd';
import { resetSpecificField } from 'utils';
import { renderTextField, renderSelectField, renderDateRangeField } from '../shared/form';


@reduxForm({form: 'pediasSearch'})
class OneClickSearch extends Component {
    static propTypes = {
        // actions: PropTypes.objectOf(PropTypes.func),
        handleSubmit: PropTypes.func,
        dispatch: PropTypes.func,
        // showDialog: PropTypes.func,
        submitting: PropTypes.bool
        // error: PropTypes.string
    };

    submit = (values) => {
        console.log(values);
    }

    render() {
        const Option = Select.Option;
        const { submitting, handleSubmit, dispatch } = this.props;
        const restRangeDateTime = () => resetSpecificField(dispatch, 'pediasSearch', 'dateTime', '');
        return (
            <div>
                <form name="form" onSubmit={handleSubmit(this.submit)}>
                    <div className="row">

                        <Field
                            layout="elementOnly"
                            name="username"
                            rowClassName="col-md-2"
                            component={renderTextField}
                            type="text"
                            prefix={<Icon type="search"/>}
                            placeholder="关键字"
                        />

                        <Field
                            layout="elementOnly"
                            name="test"
                            rowClassName="col-md-2"
                            component={renderSelectField}
                            placeholder="状态">
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="disabled" disabled>Disabled</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Field>

                        <Field
                            layout="elementOnly"
                            name="master"
                            rowClassName="col-md-2"
                            component={renderSelectField}
                            placeholder="课程讲师">
                            <Option value="jack">Jack</Option>
                        </Field>

                        <Field
                            layout="elementOnly"
                            name="dateTime"
                            rowClassName="col-md-3"
                            allowClear={true}
                            resetSelectValue={restRangeDateTime}
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

export default OneClickSearch;
