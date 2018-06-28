import validator from 'validator';

const validate = values => {
    const errors = {};
    if (!values.content && values.type === 'ARTICLE') {
        errors.content = '图文信息不能为空';
    }

    if (!values.url) {
        errors.url = '链接不能为空';
    }

    if (values.url && !validator.isURL(values.url, {protocols: ['http', 'https']})) {
        errors.url = '请输入一个正确的URL地址！';
    }

    if (!values.files && values.type === 'UPLOAD') {
        errors.files = '上传文件不能为空';
    }

    if (!values.pedias) {
        errors.pedias = '请选择一节一点通！';
    }

    return errors;
};

export default validate;
