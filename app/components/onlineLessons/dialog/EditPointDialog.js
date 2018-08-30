import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, submit, Form, Field, clearSubmitErrors, reset, SubmissionError } from 'redux-form';
import { DIALOG, renderOptions } from 'constants';
import { Modal, Button, message } from 'antd';
import { connect } from 'react-redux';
import { renderTextField, renderSelectField } from '../../shared/form';
import { Axios } from 'utils';
const mapStateToProps = (state) => ({
    draftLesson: state.draftOnlineLesson?.draftLesson,
    chapters: state.draftOnlineLesson?.chapters,
    sections: state.draftOnlineLesson?.sections
});

@connect(mapStateToProps)
@reduxForm({form: DIALOG.EDITPOINT})
class EditPointDialog extends Component {
    static dialogName = DIALOG.EDITPOINT;

    state = {sectionsOptions: []};

    closeDialog = () => {
        this.props.dispatch(clearSubmitErrors(DIALOG.EDITPOINT));
        this.props.dispatch(reset(DIALOG.EDITPOINT));
        this.props.hideDialog(DIALOG.EDITPOINT)();
    }

    editPoint = (values) => {
        console.log(values)
        if (!values.chapterForPoint) {
           
            throw new SubmissionError({chapterForPoint: '请至选择一个章名称！'});
        }
        if (!values.sectionForPoint) {
            throw new SubmissionError({sectionForPoint: '请至选择一个节名称！'});
        }
        // const points = R.omit(['chapterForPoint', 'sectionForPoint'], values);
        // if (R.isEmpty(points)) {
        //     throw new SubmissionError({_error: '请至少输入一个点名称！'});
        // }
        const {draftLesson, dispatch, hideDialog, actions: {editPoint}} = this.props;
       
       
       const sectionId = values.sectionForPoint;
        const pointId = this.props.title?this.props.title.pointId:'';

        editPoint(draftLesson?.id, sectionId, pointId)
            .then(() => {
                dispatch(reset(DIALOG.EDITPOINT));
                message.success('更新成功！');
                hideDialog(DIALOG.EDITPOINT)();
            })
            .catch(error => {
                throw new SubmissionError({
                    _error: error?.errorMessage || '更新失败'
                });
            });
  
    }

    onSelect = (value) => {//章修改 显示 节
        const {sections} = this.props;
        
        this.setState({sectionsOptions: sections[value]});
    }
    componentWillReceiveProps(nextProps){
        // if(nextProps.title){
        //     console.log(nextProps)
        //     const initData = {
        //         point: nextProps.title.point
        //     }
        //     this.pointId = nextProps.title.pointId
        //     this.props.initialize(initData);
        // }
    }
    componentDidMount() {
       
        this.handleInitialize();
      }
      handleInitialize() {
        console.log(this.props)
        // const initData = {
        //     point: this.props.title?this.props.title.point:''
        // }
        // this.props.initialize(initData);
      }
    render() {
        const {sectionsOptions} = this.state;
       
        const {draftLesson,submitting, handleSubmit, visible, width, dispatch, error, chapters} = this.props;
      
        
        return (
            <Modal
                visible={visible}
                width={width}
                title="更新点"
                onCancel={this.closeDialog}
                footer={[
                    <Button key="submit" onClick={() => dispatch(submit(DIALOG.EDITPOINT))} loading={submitting} type="primary">保存</Button>,
                    <Button key="back" onClick={this.closeDialog}>取消</Button>
                ]}
            >
                <Form name="editform" onSubmit={handleSubmit(this.editPoint)}>
                    {error && <div className="dialogContainer--error"><strong >{error}</strong></div>}

                    <div className="dialogContainer">

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="chapterForPoint"
                            component={renderSelectField}
                            onSelect={this.onSelect}
                            placeholder="属于章"
                            label="属于章"
                        >
                            {renderOptions('id', 'subject')(chapters)}
                        </Field>

                        <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="sectionForPoint"
                            component={renderSelectField}
                            placeholder="属于节"
                            label="属于节"
                        >
                            {renderOptions('id', 'subject')(sectionsOptions)}
                        </Field>

                        {/* <Field
                            labelClassName="col-md-2"
                            className="col-md-8"
                            rowClassName="dialogContainer__inputRow"
                            name="point"
                            component={renderTextField}
                            type="text"
                            placeholder="点名称"
                            label="点名称"
                        /> */}

                        
                    </div>
                </Form>
            </Modal>
        );
    }
}

EditPointDialog.propTypes = {
    hideDialog: PropTypes.func,
    handleSubmit: PropTypes.func,
    visible: PropTypes.bool,
    submitting: PropTypes.bool,
    actions: PropTypes.objectOf(PropTypes.func),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    //由于button不在form表单中， 我们采用redux-frorm的remote button，通过redux dispatch方法来来提交表单
    dispatch: PropTypes.func,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    chapters: PropTypes.array,
    sections: PropTypes.object,
    draftLesson: PropTypes.object
};

export default EditPointDialog;
