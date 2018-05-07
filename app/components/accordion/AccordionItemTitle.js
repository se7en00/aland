import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const AccordionItemTitle = (props, context) => {
    const {
        id,
        rootTag: Root,
        onClick,
        expanded,
        hideDownIcon,
        className,
        children
    } = props;
    const { theme } = context;
    const iconClass = expanded ? theme['accordion__title--active'] : theme['accordion__title--default'];
    const titleClasses = cn(
        theme.accordion__title,
        { [iconClass]: !hideDownIcon },
        className,
    );
    return (
        <Root id={id}
            className={titleClasses}
            role="menuitem"
            onClick={onClick}>
            {children}
        </Root>
    );
};

AccordionItemTitle.propTypes = {
    id: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    rootTag: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
    hideDownIcon: PropTypes.bool,
    expanded: PropTypes.bool
};

AccordionItemTitle.defaultProps = {
    id: '',
    rootTag: 'div',
    onClick: () => {console.log('2222');},
    className: '',
    hideDownIcon: false,
    expanded: false,
    children: null
};

AccordionItemTitle.contextTypes = {
    theme: PropTypes.object
};
AccordionItemTitle.accordionElementName = 'AccordionItemTitle';
export default AccordionItemTitle;
