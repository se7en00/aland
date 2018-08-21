import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DIALOG, PANEL_TITLE } from 'constants';
import { reduxForm, Form, Field, SubmissionError } from 'redux-form';
import {Button, message} from 'antd';
import { connect } from 'react-redux';
import { UploadImageField } from '../../shared/form';
import panelStyle from '../../../layout/main/Main.scss';
import Header from '../../shared/panel/PanelHeader';
import style from './PictureList.scss';

function mapStateToProps(state) {
    if (R.isEmpty(state.setting) || !state.setting?.sliders || !state.setting?.sliders?.elements.length) return null;
    const values = state.setting.sliders.elements;
    const rebuildValues = values.reduce((map, slider, index) => {
        map[`avatarUrl${index}`] = [slider?.image || slider?.link];
        return map;
    }, {});
    return {
        initialValues: rebuildValues
    };
}

@connect(mapStateToProps)
@reduxForm({form: 'carouselForm', enableReinitialize: true})
class PictureList extends Component {
    static propTypes = {
        showDialog: PropTypes.func,
        actions: PropTypes.objectOf(PropTypes.func),
        handleSubmit: PropTypes.func,
        submitting: PropTypes.bool
    };

    componentDidMount() {
        this.props.actions.getSliders();
    }

    componentWillUnmount() {
        this.props.actions.resetSliders();
    }

    openCreateDialog = () => {
        const {showDialog} = this.props;
        showDialog(DIALOG.SECURITY_SETTING)();
    };

    submit = (values) => {
        const params = Object.keys(values).map((key) => {
            try {
                if (R.isEmpty(values.key)) return null;
                return values[key][0]?.response?.locations[0];
            } catch (error) {
                throw new SubmissionError({cover: '上传图片失败！'});
            }
        }).filter(Boolean);
        this.props.actions.setSliders(params)
            .then(() => {
                message.success('保存成功');
            })
            .catch(() => {
                message.error('保存失败');
            });
    }

    render() {
        const {handleSubmit, submitting} = this.props;
        return (
            <div>
                <Header title={PANEL_TITLE.PICTURE}/>
                <div className={panelStyle.panel__body}>
                    <span>图像尺寸要求：1242 像素 X 660像素 ，支持格式：jpg 、png、gif。</span>
                    <Form name="form" onSubmit={handleSubmit(this.submit)}>
                        <div className="row">
                            <Field
                                layout="elementOnly"
                                rowClassName="col-md-4 col-lg-4"
                                className={style.carouselForm}
                                accept="image/*"
                                name="avatarUrl0"
                                uploadFileCount="1"
                                component={UploadImageField}
                                uploadTitle="上传图片"
                            />
                            <Field
                                layout="elementOnly"
                                rowClassName="col-md-4 col-lg-4"
                                className={style.carouselForm}
                                accept="image/*"
                                name="avatarUrl1"
                                uploadFileCount="1"
                                component={UploadImageField}
                                uploadTitle="上传图片"
                            />
                        </div>
                        <div className="row u-pull-down-md">
                            <Field
                                layout="elementOnly"
                                rowClassName="col-md-4 col-lg-4"
                                className={style.carouselForm}
                                accept="image/*"
                                name="avatarUrl2"
                                uploadFileCount="1"
                                component={UploadImageField}
                                uploadTitle="上传图片"
                            />
                            <Field
                                layout="elementOnly"
                                rowClassName="col-md-4 col-lg-4"
                                className={style.carouselForm}
                                accept="image/*"
                                name="avatarUrl3"
                                uploadFileCount="1"
                                component={UploadImageField}
                                uploadTitle="上传图片"
                            />
                        </div>
                        <div className="row u-pull-down-lg">
                            <div className="col-md-4 col-lg-4">
                                <Button htmlType="submit" loading={submitting} type="primary" className="editable-add-btn">保存</Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

export default PictureList;
