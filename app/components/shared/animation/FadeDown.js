import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { CSSTransition } from 'react-transition-group';
import fadeStyle from './FadeDown.scss';

const FadeDown = (props) => {
    const {children, inProp, duration} = props;
    const cx = classNames.bind(fadeStyle);
    const fadeClassName = {
        enter: cx('fade__enter'),
        enterActive: cx('fade__enter--active'),
        exit: cx('fade__exit'),
        exitActive: cx('fade__exit--active')
    };
    return (
        <CSSTransition
            in={inProp}
            timeout={duration}
            unmountOnExit={true}
            classNames={fadeClassName}>
            {children}
        </CSSTransition>
    );
};

FadeDown.propTypes = {
    children: PropTypes.node,
    inProp: PropTypes.bool.isRequired,
    duration: PropTypes.number.isRequired
};

FadeDown.defaultProps = {
    children: null
};

export default FadeDown;
