import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Button, Icon, Select } from 'antd';
import uuid from 'uuid/v4';
import { renderOptions } from 'constants';
import { resetSpecificField } from 'utils';
import { renderTextField, renderDateRangeField} from '../shared/form';
import AutoSelectSearch from '../shared/autoSearch/AutoSelectSearch';

const Option = Select.Option;

@reduxForm({form: 'summarySearch'})
class SummarySearch extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        dispatch: PropTypes.func,
        submitting: PropTypes.bool,
        departments: PropTypes.array,
        userLevels: PropTypes.array
    };

    renderDepartmentsOptions = () => {
        const {departments = []} = this.props;
        return renderOptions('name', 'name')(departments);
    }

    renderUserLevelsOptions = () => {
        const {userLevels = []} = this.props;
        return userLevels.map(item => (
            <Option key={uuid()} value={item}>{item}</Option>
        ));
    }

    render() {
        const { submitting, handleSubmit, dispatch } = this.props;
        const restRangeDateTime = () => resetSpecificField(dispatch, 'summarySearch', 'dateTime', '');
        const restManagerValue = () => resetSpecificField(dispatch, 'summarySearch', 'manager', '');
        return (
            <div>
                <form name="form" onSubmit={handleSubmit}>
                    <div className="row">

                        <Field
                            layout="elementOnly"
                            name="title"
                            rowClassName="col-md-2"
                            component={renderTextField}
                            type="text"
                            prefix={<Icon type="search"/>}
                            placeholder="关键字"
                        />


                        <AutoSelectSearch
                            api="/api/users"
                            query="name"
                            resetSelectValue={restManagerValue}
                            rowClassName="col-md-2"
                            name="manager"
                            layout="elementOnly"
                            placeholder="创建人"
                            renderOptions={renderOptions('id', 'name')}
                        />

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

export default SummarySearch;
