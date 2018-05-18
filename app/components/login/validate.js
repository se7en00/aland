const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = '登录名不能为空';
    }
    if (!values.password) {
        errors.password = '密码不能为空';
    }
    //找回密码
    if (!values.usernameForReset) {
        errors.usernameForReset = '登录名不能为空';
    }
    if (!values.email) {
        errors.email = '邮箱不能为空';
    }
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = '请输入正确的Email格式';
    }

    return errors;
};

export default validate;
