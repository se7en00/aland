const validate = values => {
    const errors = {};
    //找回密码
    if (!values.title) {
        errors.title = '培训标题不能为空';
    }
    if (!values.lecturerId) {
        errors.lecturerId = '培训讲师不能为空';
    }

    if (!values.address) {
        errors.address = '培训地址不能为空';
    }
    return errors;
};

export default validate;
