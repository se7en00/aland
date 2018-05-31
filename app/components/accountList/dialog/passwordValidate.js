/* eslint-disable no-magic-numbers */
const validate = values => {
    const errors = {};
    if (!values.oldPsd) {
        errors.oldPsd = '当前密码不能为空！';
    }

    if (!values.newPsd) {
        errors.newPsd = '新密码不能为空！';
    }

    if (values.newPsd && values.newPsd.length < 6) {
        errors.newPsd = '请至少输入6个字符作为密码！';
    }

    if (values.oldPsd && values.newPsd && values.oldPsd === values.newPsd) {
        errors.newPsd1 = '请不要设置原密码为新密码！';
    }

    if (!values.newPsd1) {
        errors.newPsd1 = '此新密码不能为空！';
    }


    if (values.newPsd1 && values.newPsd1.length < 6) {
        errors.newPsd1 = '请至少输入6个字符作为密码！';
    }

    if (values.newPsd && values.newPsd1 && values.newPsd1 !== values.newPsd) {
        errors.newPsd1 = '密码不一致！';
    }
    return errors;
};

export default validate;
/* eslint-disable no-magic-numbers */
