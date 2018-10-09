import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import { examTypeOptions, renderOptions } from 'constants';
import { resetSpecificField } from 'utils';
import { renderTextField, renderSelectField, renderDateRangeField} from '../shared/form';

@reduxForm({form: 'examsSearch'})
class ExamsSearch extends Component {
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
        const restRangeDateTime = () => resetSpecificField(dispatch, 'examsSearch', 'dateTime', '');
        const restCategory = () => resetSpecificField(dispatch, 'examsSearch', 'category', '');
        const restExamType = () => resetSpecificField(dispatch, 'examsSearch', 'type', '');
        return (
            <div>
                <form name="form" onSubmit={handleSubmit}>
                    <div className="row">

                        <Field
                            layout="elementOnly"
                            name="question"
                            rowClassName="col-md-2"
                            component={renderTextField}
                            type="text"
                            prefix={<Icon type="search"/>}
                            placeholder="试题"
                        />

                        <Field
                            layout="elementOnly"
                            rowClassName="col-md-2"
                            name="category"
                            allowClear={true}
                            resetSelectValue={restCategory}
                            component={renderSelectField}
                            placeholder="种类"
                        >
                            {this.renderCategoryOptions()}
                        </Field>

                        <Field
                            layout="elementOnly"
                            name="createUserName"
                            rowClassName="col-md-2"
                            component={renderTextField}
                            placeholder="出题人"
                        />

                        <Field
                            layout="elementOnly"
                            rowClassName="col-md-2"
                            name="type"
                            allowClear={true}
                            resetSelectValue={restExamType}
                            component={renderSelectField}
                            placeholder="题型"
                        >
                            {examTypeOptions}
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

export default ExamsSearch;
