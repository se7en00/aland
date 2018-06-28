import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Axios } from 'utils';
import { Upload, Icon, Button } from 'antd';
import uuid from 'uuid/v4';
import { BASE_URL } from 'constants';
import remapReduxFormProps from '../RemapReduxFormProps';

@remapReduxFormProps
class UploadFilesField extends Component {
    static propTypes = {
        input: PropTypes.object,
        accept: PropTypes.string,
        uploadTitle: PropTypes.string,
        className: PropTypes.string,
        onlyOneFile: PropTypes.bool
    }

    state = {fileList: []};

    componentWillReceiveProps(nextProps) {
        if (nextProps.input.value) {
            let {value} = nextProps.input;
            if (!Array.isArray(value)) {
                value = [value];
            }
            const files = value.map(fileUrl => {
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

    onAttachmentChange = (info) => {
        let fileList = info.fileList;
        const {onlyOneFile, input} = this.props;
        if (onlyOneFile) {
            fileList = fileList.slice(-1);
        }
        fileList = fileList.map((file) => {
            if (file.response) {
                file.url = file.response.locations[0];
            }
            return file;
        });
        this.setState({ fileList });
        if (onlyOneFile) {
            input.onChange(fileList[0]);
        } else {
            input.onChange(fileList);
        }
    }

    render() {
        const { fileList } = this.state;
        const {accept, className, uploadTitle} = this.props;
        return (
            <div className={className}>
                <Upload
                    accept={accept}
                    action="/api/uploads"
                    fileList={fileList}
                    customRequest={this.handleUploadFile}
                    onChange={this.onAttachmentChange}
                >
                    <Button>
                        <Icon type="upload"/> {uploadTitle}
                    </Button>
                </Upload>
            </div>
        );
    }
}

export default UploadFilesField;
