const validate = values => {
    const errors = {};
    if (!values.loginName) {
        errors.loginName = '账户名不能为空';
    }
    if (!values.name) {
        errors.name = '登录名不能为空';
    }
    return errors;
};

export default validate;
