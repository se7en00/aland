import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Axios } from 'utils';
import { BASE_URL } from 'constants';
import { Upload, Icon, Modal } from 'antd';
import uuid from 'uuid/v4';
import remapReduxFormProps from '../RemapReduxFormProps';

@remapReduxFormProps
class UploadField extends Component {
    static propTypes = {
        input: PropTypes.object,
        accept: PropTypes.string,
        uploadFileCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        // placeholder: PropTypes.string,
        // meta: PropTypes.object,
        // prefix: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
        uploadTitle: PropTypes.string,
        className: PropTypes.string
    }

    state = {
        previewVisible: false,
        previewImage: '',
        fileList: []
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.input.value && Array.isArray(nextProps.input.value)) {
            const files = nextProps.input.value.map(fileUrl => {
                if (!fileUrl) return null;
                if (fileUrl.status) return fileUrl;
                const splitArray = fileUrl.split('/');
                const domain = new URL(BASE_URL).origin;
                return {
                    uid: uuid(),
                    name: splitArray[splitArray.length - 1] || '',
                    status: 'done',
                    url: `${domain}/uploads${fileUrl}`
                };
            }).filter(Boolean);
            this.setState({fileList: files});
        }
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = file => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        });
    };

    //上传文件
    handleUploadFile = ({action, file, onError, onSuccess}) => {
        const formData = new FormData();
        formData.append('file', file);

        Axios.post(action, formData)
            .then(({ data: response }) => {
                onSuccess(response, file);
            })
            .catch(onError);
    }


    // beforeUpload = (file) => {
    //     const isLt2M = file.size / 1024 / 1024 < 2; //eslint-disable-line
    //     if (!isLt2M) {
    //         message.error('图片超过2MB!，请上传小于2MB的图片');
    //     }
    //     return !!isLt2M;
    // }

   onAttachmentChange = ({ fileList }) => {
       this.setState({ fileList });
       this.props.input.onChange(fileList);
   }

   render() {
       const { previewVisible, previewImage, fileList } = this.state;
       const {accept, uploadFileCount, className, uploadTitle} = this.props;
       const uploadButton = (
           <div>
               <Icon type="plus"/>
               <div className="ant-upload-text">{uploadTitle}</div>
           </div>
       );
       return (
           <div className={className}>
               <Upload
                   accept={accept}
                   action="/api/uploads"
                   listType="picture-card"
                   fileList={fileList}
                   customRequest={this.handleUploadFile}
                   // beforeUpload={this.beforeUpload}
                   onPreview={this.handlePreview}
                   onChange={this.onAttachmentChange}
               >
                   {fileList.length >= uploadFileCount ? null : uploadButton}
               </Upload>
               <Modal
                   visible={previewVisible}
                   footer={null}
                   onCancel={this.handleCancel}
               >
                   <img alt="example" style={{ width: '100%' }} src={previewImage}/>
               </Modal>
           </div>
       );
   }
}

export default UploadField;
