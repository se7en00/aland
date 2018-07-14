import validator from 'validator';

const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = '不能为空';
    }

    if (!values.phoneNumber) {
        errors.phoneNumber = '不能为空';
    }

    if (values.phoneNumber && !validator.isNumeric(values.phoneNumber)) {
        errors.phoneNumber = '请输入正确的手机号码！';
    }

    if (values.email && !validator.normalizeEmail(values.email)) {
        errors.phoneNumber = '请输入正确的电子邮件！';
    }

    if (values.term && !validator.isInt(`${values.term}`, {gt: 0})) {
        errors.term = '请输入正确的天数！';
    }

    return errors;
};

export default validate;
