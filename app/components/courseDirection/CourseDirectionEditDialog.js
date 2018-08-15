import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, Form, clearSubmitErrors, reset, submit } from 'redux-form';
import { DIALOG } from 'constants';
import { Modal, Button, message } from 'antd';
import { paginationSetting } from 'utils';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import { renderTextField } from '../shared/form';

const required = value => (value ? undefined : '不能为空！');

const mapStateToProp = (state) => {
    if (R.isEmpty(state.courserDirection) || !state?.courserDirection?.courseDirectionDetails) return null;
    const { courseDirectionDetails } = state.courserDirection;
    let others;
    if (courseDirectionDetails.subDirections) {
        others = courseDirectionDetails.subDirections.reduce((map, item, index) => {
            map[`subDirections_${index}`] = item.direction;
            return map;
        }, {});
    }
    return {
        initialValues: {
            direction: courseDirectionDetails.direction,
            ...others
        },
        courseDirectionDetails
    };
};

@connect(mapStateToProp)
@reduxForm({form: DIALOG.COURSE_EDIT_DIRECTION, enableReinitialize: true})
class CourseDirectionEditDialog extends Component {
    static dialogName = DIALOG.COURSE_EDIT_DIRECTION;

    state = {
        rows: 3,
        isRowsChanged: false
    }

    closeDialog = () => {
        this.props.dispatch(clearSubmitErrors(DIALOG.COURSE_EDIT_DIRECTION));
        this.props.dispatch(reset(DIALOG.COURSE_EDIT_DIRECTION));
        this.props.hideDialog(DIALOG.COURSE_EDIT_DIRECTION)();
    }

    submit= (values) => {
        const {updateCourseDirection, getCourseDirectionList} = this.props.actions;
        const params = {
            direction: values.direction
        };
        if (values.subDirections_0) {
            params.subDirections = Object.keys(values).map((key) => {
                if (key !== 'direction') {
                    return {
                        direction: values[key]
                    };
                }
                return '';
            }).filter(Boolean);
        }
        updateCourseDirection(this.props.courseDirectionDetails.id, params)
            .then(() => {
                getCourseDirectionList({pageSize: paginationSetting.pageSize, parentId: 0}).then(() => {
                    message.success('更新成功');
                    this.closeDialog();
                });
            })
            .catch(error => {
                message.success('更新失败');
            });
    }

    componentWillReceiveProps(nextProps) {
        const {isRowsChanged} = this.state;
        if (nextProps.courseDirectionDetails && nextProps.courseDirectionDetails.subDirections && nextProps.courseDirectionDetails.subDirections.length > 0 && !isRowsChanged) {
            this.setState({rows: nextProps.courseDirectionDetails.subDirections.length});
        }
    }

    renderSecondItem = () => {
        const {rows} = this.state;
        const result = [];
        for (let i = 0; i < rows; i++) { //eslint-disable-line
            result.push(
                <Field
                    key={uuid()}
                    labelClassName="col-md-3"
                    className="col-md-8"
                    rowClassName="dialogContainer__inputRow"
                    name={`subDirections_${i}`}
                    component={renderTextField}
                    type="text"
                    placeholder="二级种类名称"
                    label="对应二级种类名称"
                />
            );
        }
        return result;
    }

    addRow = () => {
        const {rows} = this.state;
        this.setState({rows: rows + 1, isRowsChanged: true});
    }

    render() {
        const {submitting, handleSubmit, visible, width, error, dispatch} = this.props;
        return (
            <Modal
                visible={visible}
                width={width}
                title="新增"
                onCancel={this.closeDialog}
                footer={[
                    <Button key="submit" onClick={() => dispatch(submit(DIALOG.COURSE_EDIT_DIRECTION))} loading={submitting} type="primary">保存</Button>,
                    <Button key="back" onClick={this.closeDialog}>取消</Button>
                ]}
            >
                <Form onSubmit={handleSubmit(this.submit)}>
                    {error && <div className="dialogContainer--error"><strong >{error}</strong></div>}

                    <div className="dialogContainer">
                        <Field
                            labelClassName="col-md-3"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="direction"
                            component={renderTextField}
                            type="text"
                            placeholder="一级种类名称"
                            label="一级种类名称"
                            validate={required}
                        />

                        {this.renderSecondItem()}

                        <div className="row dialogContainer__inputRow">
                            <div className="offset-md-3 col-md-8 u-text-right">
                                <Button type="primary" onClick={this.addRow}>继续添加</Button>
                            </div>
                        </div>


                    </div>
                </Form>
            </Modal>
        );
    }
}

CourseDirectionEditDialog.propTypes = {
    hideDialog: PropTypes.func,
    handleSubmit: PropTypes.func,
    visible: PropTypes.bool,
    submitting: PropTypes.bool,
    courseDirectionDetails: PropTypes.object,
    actions: PropTypes.objectOf(PropTypes.func),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    dispatch: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

export default CourseDirectionEditDialog;
