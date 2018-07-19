import validator from 'validator';

const validate = values => {
    const errors = {};
    if (!values.loginName) {
        errors.loginName = '账户名不能为空';
    }
    if (!values.name) {
        errors.name = '登录名不能为空';
    }

    if (values.loginName && !validator.isAlphanumeric(values.loginName)) {
        errors.loginName = '登录名只能是数字或字母';
    }
    return errors;
};

export default validate;
