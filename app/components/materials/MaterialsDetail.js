import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {reduxForm, Field, Form, SubmissionError} from 'redux-form';
import { renderOptions, PATHNAME, getLinkByName } from 'constants';
import { Button, message } from 'antd';
import { renderSelectField, renderTextField, UploadFilesField } from '../shared/form';

const required = value => (value ? undefined : '不能为空！');

@reduxForm({ form: 'materialsDetail' })
class MaterialsDetail extends Component {
    static propTypes = {
        actions: PropTypes.object,
        materials: PropTypes.object,
        handleSubmit: PropTypes.func,
        submitting: PropTypes.bool
    };

    componentDidMount() {
        const { materials: { material }, actions: { getMaterial, getCategories } } = this.props;
        if (/detail$/g.test(location.pathname) && !material) {
            const id = location.pathname.match(/(\w)+(?=\/detail$)/g)[0];
            if (id) {
                getMaterial(id);
            }
        }
        getCategories().catch(error => console.log(error));
    }

    renderListOptions = (key) => {
        const { materials: { material } } = this.props;
        if (!material) {
            return [];
        }
        return renderOptions('id', 'content')(material[key]);
    };

    back = () => {
        const { actions: { push }} = this.props;
        push(getLinkByName(PATHNAME.MATERIALS));
    };

    generateMaterial = (values) => {
        const { materials: { material }, actions } = this.props;
        const file = values.uri?.[0];
        try {
            if (file) {
                Object.assign(values, {uri: file?.response?.locations[0]});
            }
        } catch (error) {
            throw new SubmissionError({cover: '上传素材失败！'});
        }
        const func = material ? 'editMaterial' : 'addMaterial';
        actions[func](material?.id, values)
            .then(() => {
                message.success(`保存素材${values.name}成功！`);
                this.back();
            })
            .catch(() => {message.success(`保存素材${values.name}失败！`);});
    };

    renderCategoryOptions = () => {
        const { materials: { categoryList = [] } } = this.props;
        return renderOptions('code', 'name')(categoryList);
    }

    render() {
        const { submitting, handleSubmit } = this.props;
        return (
            <div>
                <Form name="form" onSubmit={handleSubmit(this.generateMaterial)}>
                    <Field
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="uri"
                        component={UploadFilesField}
                        type="text"
                        placeholder="素材上传"
                        label="素材上传"
                        uploadTitle="本地上传"
                        uploadFileCount="1"
                        accept="video/*,audio/*,image/*,application/*"
                        validate={required}
                    />
                    <Field
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="name"
                        component={renderTextField}
                        type="text"
                        placeholder="素材名称"
                        label="素材名称"
                        validate={required}
                    />

                    <Field
                        className="col-md-8 col-lg-6"
                        rowClassName="inputRow"
                        name="categoryCode"
                        component={renderSelectField}
                        placeholder="种类"
                        label="种类"
                        validate={required}
                    >
                        { this.renderCategoryOptions() }
                    </Field>
                    {/*<Field*/}
                    {/*className="col-md-8 col-lg-6"*/}
                    {/*rowClassName="inputRow"*/}
                    {/*name="product"*/}
                    {/*component={renderSelectField}*/}
                    {/*placeholder="与什么产品有关"*/}
                    {/*label="与什么产品有关"*/}
                    {/*validate={required}*/}
                    {/*>*/}
                    {/*{this.renderListOptions('productTags')}*/}
                    {/*</Field>*/}

                    {/*<Field*/}
                    {/*className="col-md-8 col-lg-6"*/}
                    {/*rowClassName="inputRow"*/}
                    {/*name="process"*/}
                    {/*component={renderSelectField}*/}
                    {/*placeholder="有什么工序"*/}
                    {/*label="有什么工序"*/}
                    {/*validate={required}*/}
                    {/*>*/}
                    {/*{this.renderListOptions('processTags')}*/}
                    {/*</Field>*/}

                    {/*<Field*/}
                    {/*className="col-md-8 col-lg-6"*/}
                    {/*rowClassName="inputRow"*/}
                    {/*name="task"*/}
                    {/*component={renderSelectField}*/}
                    {/*placeholder="与什么任务有关"*/}
                    {/*label="与什么任务有关"*/}
                    {/*validate={required}*/}
                    {/*>*/}
                    {/*{this.renderListOptions('taskTags')}*/}
                    {/*</Field>*/}

                    {/*<Field*/}
                    {/*className="col-md-8 col-lg-6"*/}
                    {/*rowClassName="inputRow"*/}
                    {/*name="department"*/}
                    {/*component={renderSelectField}*/}
                    {/*placeholder="与什么部门有关"*/}
                    {/*label="与什么部门有关"*/}
                    {/*validate={required}*/}
                    {/*>*/}
                    {/*{this.renderListOptions('departmentTags')}*/}
                    {/*</Field>*/}

                    {/*<Field*/}
                    {/*className="col-md-8 col-lg-6"*/}
                    {/*rowClassName="inputRow"*/}
                    {/*name="work"*/}
                    {/*component={renderSelectField}*/}
                    {/*placeholder="与什么工种有关"*/}
                    {/*label="与什么工种有关"*/}
                    {/*validate={required}*/}
                    {/*>*/}
                    {/*{this.renderListOptions('workTags')}*/}
                    {/*</Field>*/}

                    {/*<Field*/}
                    {/*className="col-md-8 col-lg-6"*/}
                    {/*rowClassName="inputRow"*/}
                    {/*name="device"*/}
                    {/*component={renderSelectField}*/}
                    {/*placeholder="相关设备"*/}
                    {/*label="相关设备"*/}
                    {/*validate={required}*/}
                    {/*>*/}
                    {/*{this.renderListOptions('deviceTags')}*/}
                    {/*</Field>*/}

                    {/*<Field*/}
                    {/*className="col-md-8 col-lg-6"*/}
                    {/*rowClassName="inputRow"*/}
                    {/*name="material"*/}
                    {/*component={renderSelectField}*/}
                    {/*placeholder="相关材料"*/}
                    {/*label="相关材料"*/}
                    {/*validate={required}*/}
                    {/*>*/}
                    {/*{this.renderListOptions('materialTags')}*/}
                    {/*</Field>*/}

                    {/*<Field*/}
                    {/*className="col-md-8 col-lg-6"*/}
                    {/*rowClassName="inputRow"*/}
                    {/*name="operation"*/}
                    {/*component={renderSelectField}*/}
                    {/*placeholder="相关基本工作操作"*/}
                    {/*label="相关基本工作操作"*/}
                    {/*validate={required}*/}
                    {/*>*/}
                    {/*{this.renderListOptions('operationTags')}*/}
                    {/*</Field>*/}

                    {/*<Field*/}
                    {/*className="col-md-8 col-lg-6"*/}
                    {/*rowClassName="inputRow"*/}
                    {/*name="risk"*/}
                    {/*component={renderSelectField}*/}
                    {/*placeholder="相关安全风险"*/}
                    {/*label="相关安全风险"*/}
                    {/*validate={required}*/}
                    {/*>*/}
                    {/*{this.renderListOptions('riskTag')}*/}
                    {/*</Field>*/}

                    <div className="row inputRow">
                        <div className="col-md-8 col-lg-6 offset-md-2 offset-lg-1 u-text-right">
                            <Button key="back" onClick={this.back} loading={submitting} type="secondary" className="editable-add-btn">取消</Button>
                            <Button htmlType="submit" loading={submitting} type="primary" className="editable-add-btn">保存</Button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}
export default MaterialsDetail;
