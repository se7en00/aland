import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { Input, Icon } from 'antd';
import classNames from 'classnames/bind';
import style from './InputElement.scss';

class InputElement extends PureComponent {
    static propTypes = {
        input: PropTypes.object,
        placeholder: PropTypes.string,
        meta: PropTypes.object,
        prefix: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
        type: PropTypes.string,
        label: PropTypes.string,
        className: PropTypes.string,
        rowClassName: PropTypes.string,
        labelClassName: PropTypes.string,
        layout: PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly'])
    }

    static defaultProps = {
        rowClassName: '',
        labelClassName: '',
        layout: 'horizontal'
    }

    //渲染antd input
    inputElement = () => {
        const {
            input,
            placeholder,
            meta: { touched, error, warning, asyncValidating },
            type,
            className,
            prefix = null
        } = this.props;

        let errorSuffix;
        const cx = classNames.bind(style);
        const inputClass = cx(className, 'input-wrapper', {'error-border': touched && (error || warning)});
        errorSuffix = touched && error ? <Icon type="close-circle" className={style.error}/> : null;
        errorSuffix = asyncValidating ? <Icon type="loading" className={style.loadingColor}/> : errorSuffix;
        return (
            <div className={inputClass}>
                <Input
                    {...input}
                    type={type}
                    suffix={errorSuffix}
                    prefix={prefix}
                    placeholder={placeholder}/>
                {touched && error && this.errorMsg(error)}
            </div>
        );
    }

    //渲染error msg
    errorMsg = (errorMsg) => <span className={style.error}>{errorMsg}</span>

    //渲染label
    label = (label, inputName, labelClass) => <label htmlFor={inputName} className={labelClass}>{label}</label>

    renderInputElement = () => {
        const {
            layout,
            input: {name},
            label,
            rowClassName,
            labelClassName} = this.props;
        const cssClasses = {row: []}; //init row css

        //水平方向, 父层div class默认为row
        if (layout === 'horizontal') {
            cssClasses.row.push('row');
        }

        //自定义父层div class
        cssClasses.row.push(rowClassName);
        return (
            <div className={classNames(cssClasses.row)}>
                {label && layout !== 'elementOnly' && this.label(label, name, labelClassName)}
                {this.inputElement()}
            </div>);
    };

    render() {
        return this.renderInputElement();
    }
}

export default InputElement;
