import React, {PureComponent, Fragment} from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import classNames from 'classnames/bind';
import style from './InputElement.scss';
// import RemapReduxFormProps from '../RemapReduxFormProps';

class InputElement extends PureComponent {
    static propTypes = {
        input: PropTypes.object,
        placeholder: PropTypes.string,
        meta: PropTypes.object,
        prefix: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
        type: PropTypes.string,
        className: PropTypes.string
    }

    static defaultProps = {
        rowClassName: ''
    }


    render() {
        const {
            input,
            placeholder,
            meta: { touched, error, warning },
            type,
            prefix = null
        } = this.props;

        const cx = classNames.bind(style);
        const errorClass = cx({'error-border': touched && (error || warning)});
        return (
            <Fragment>
                <Input
                    {...input}
                    className={errorClass}
                    type={type}
                    prefix={prefix}
                    placeholder={placeholder}
                />
                {touched && error && <span className={style.error}>{error}</span>}
            </Fragment>
        );
    }
}

export default InputElement;
