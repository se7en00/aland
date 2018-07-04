import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import { fileTypeOptions } from 'constants';
import { renderTextField, renderSelectField, renderDateRangeField} from '../shared/form';

@reduxForm({form: 'materialsSearch'})
class MaterialsSearch extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func,
        submitting: PropTypes.bool
    };

    render() {
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
                            placeholder="素材"
                        />

                        <Field
                            layout="elementOnly"
                            name="tag"
                            rowClassName="col-md-2"
                            component={renderTextField}
                            placeholder="标签"
                        />

                        <Field
                            layout="elementOnly"
                            name="tag"
                            rowClassName="col-md-2"
                            component={renderTextField}
                            placeholder="上传人"
                        />

                        <Field
                            layout="elementOnly"
                            rowClassName="col-md-2"
                            name="fileType"
                            component={renderSelectField}
                            placeholder="类别"
                            label="类别"
                        >
                            {fileTypeOptions}
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

export default MaterialsSearch;
