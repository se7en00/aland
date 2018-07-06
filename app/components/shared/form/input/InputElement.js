import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { Input, Icon } from 'antd';
import classNames from 'classnames/bind';
import style from './InputElement.scss';
import remapReduxFormProps from '../RemapReduxFormProps';

@remapReduxFormProps
class InputElement extends PureComponent {
    static propTypes = {
        input: PropTypes.object,
        placeholder: PropTypes.string,
        meta: PropTypes.object,
        prefix: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
        type: PropTypes.string,
        rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        addonBefore: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
        className: PropTypes.string,
        disabled: PropTypes.bool
    }

    //渲染error msg
    errorMsg = (errorMsg) => <span className="error">{errorMsg}</span>

    render() {
        const {
            input,
            placeholder,
            meta: { touched, error, warning, asyncValidating },
            type,
            className,
            prefix = null,
            addonBefore,
            rows,
            disabled
        } = this.props;

        let errorSuffix;
        const cx = classNames.bind(style);
        const inputClass = cx(className, 'input-wrapper', {'error-border': touched && (error || warning)});
        errorSuffix = touched && error ? <Icon type="close-circle" className="error"/> : null;
        errorSuffix = asyncValidating ? <Icon type="loading" className={style.loadingColor}/> : errorSuffix;

        return (
            <div className={inputClass}>
                {type === 'textarea' &&
                    <Input.TextArea
                        {...input}
                        disabled={disabled}
                        rows={rows}
                        type={type}
                        placeholder={placeholder}/>
                }
                {type !== 'textarea' &&
                    <Input
                        {...input}
                        addonBefore={addonBefore}
                        disabled={disabled}
                        rows={rows}
                        type={type}
                        suffix={errorSuffix}
                        prefix={prefix}
                        placeholder={placeholder}/>
                }
                {touched && error && this.errorMsg(error)}
            </div>
        );
    }
}

export default InputElement;
