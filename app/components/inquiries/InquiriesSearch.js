import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { Button, Icon } from 'antd';
import { resetSpecificField } from 'utils';
import { renderOptions } from 'constants';
import { renderTextField, renderSelectField, renderDateRangeField} from '../shared/form';

@reduxForm({form: 'inquiriesSearch'})
class InquiriesSearch extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        dispatch: PropTypes.func,
        submitting: PropTypes.bool,
        categoryList: PropTypes.array
    };

    renderCategoryOptions = () => {
        const {categoryList = []} = this.props;
        console.log(categoryList)
        return renderOptions('code', 'name')(categoryList);
    }

    render() {
        const { submitting, handleSubmit, dispatch } = this.props;
        const restRangeDateTime = () => resetSpecificField(dispatch, 'inquiriesSearch', 'dateTime', '');
        const restCategory = () => resetSpecificField(dispatch, 'inquiriesSearch', 'categoryCode', '');
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
                            placeholder="问卷"
                        />

                        {/* <Field
                            layout="elementOnly"
                            name="tag"
                            rowClassName="col-md-3"
                            component={renderTextField}
                            placeholder="标签"
                        /> */}

                        <Field
                            layout="elementOnly"
                            rowClassName="col-md-3"
                            name="categoryCode"
                            allowClear={true}
                            resetSelectValue={restCategory}
                            component={renderSelectField}
                            placeholder="种类"
                        >
                            {this.renderCategoryOptions()}
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

export default InquiriesSearch;
