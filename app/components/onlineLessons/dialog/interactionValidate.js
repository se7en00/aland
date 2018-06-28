import validator from 'validator';

const validate = values => {
    const errors = {};
    if (!values.content1) {
        errors.content1 = '不能为空';
    }

    if (!values.users) {
        errors.users = '请至少选择一个互动学员';
    }

    if (!values.term) {
        errors.term = '天数不能为空';
    }

    if (values.term && !validator.isInt(values.term, {gt: 0})) {
        errors.term = '请输入正确的天数！';
    }

    return errors;
};

export default validate;
