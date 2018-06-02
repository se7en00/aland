import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import classNames from 'classnames/bind';

const remapReduxFormProps = (WrappedComponent) => class WithRemappedCustomProps extends React.Component {
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
        };

        static defaultProps = {
            rowClassName: '',
            labelClassName: '',
            layout: 'horizontal'
        }

        //渲染label
        label = (label, inputName, labelClass) => <label htmlFor={inputName} className={labelClass}>{label}</label>

        render() {
            const {
                layout,
                input: {name},
                label,
                rowClassName,
                labelClassName} = this.props;
            //过滤一些不用的属性
            const omitProps = ['layout', 'label', 'rowClassName', 'labelClassName'];
            const props = R.omit(omitProps, this.props);

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
                    <WrappedComponent {...props}/>
                </div>
            );
        }
};

export default remapReduxFormProps;
