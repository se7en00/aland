import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import FadeDown from 'components/shared/animation/FadeDown';

const AccordionItemContent = (props, context) => {
    const {
        id,
        expanded,
        rootTag: Root,
        onClick,
        className,
        // hideContentClassName,
        children
    } = props;
    const { theme } = context;
    const contentClasses = cn(
        theme.accordion__content,
        // { [theme['accordion__content--hide']]: !expanded },
        className
    );
    return (
        <FadeDown inProp={expanded} duration={800}>
            <Root id={id}
                className={contentClasses}
                onClick={onClick}>
                {children}
            </Root>
        </FadeDown>
    );
};

AccordionItemContent.propTypes = {
    id: PropTypes.string,
    expanded: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    rootTag: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string
    // hideContentClassName: PropTypes.string
};

AccordionItemContent.defaultProps = {
    id: '',
    expanded: false,
    children: null,
    rootTag: 'div',
    onClick: () => {},
    className: '',
    hideContentClassName: ''
};

AccordionItemContent.contextTypes = {
    theme: PropTypes.object
};
AccordionItemContent.accordionElementName = 'AccordionItemBody';

export default AccordionItemContent;
