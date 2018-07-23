import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Button, Icon, Select } from 'antd';
import { resetSpecificField } from 'utils';
import { renderTextField, renderSelectField, renderDateRangeField} from '../shared/form';

@reduxForm({form: 'newsSearch'})
class NewsSearch extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        dispatch: PropTypes.func,
        submitting: PropTypes.bool
    };

    render() {
        const { submitting, handleSubmit, dispatch } = this.props;
        const restRangeDateTime = () => resetSpecificField(dispatch, 'newsSearch', 'dateTime', '');
        return (
            <div>
                <form name="form" onSubmit={handleSubmit}>
                    <div className="row">

                        <Field
                            layout="elementOnly"
                            name="key"
                            rowClassName="col-md-2"
                            component={renderTextField}
                            type="text"
                            prefix={<Icon type="search"/>}
                            placeholder="关键词"
                        />

                        <Field
                            layout="elementOnly"
                            rowClassName="col-md-3"
                            name="status"
                            component={renderSelectField}
                            placeholder="状态"
                        >
                            <Select.Option value={1}>在用</Select.Option>
                            <Select.Option value="0">停用</Select.Option>
                            <Select.Option value={-1}>删除</Select.Option>
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

export default NewsSearch;
