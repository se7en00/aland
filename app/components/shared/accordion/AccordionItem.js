import React, { Component } from 'react';
import cn from 'classnames/bind';
import PropTypes from 'prop-types';
import consecutive from 'consecutive';

const nextUuid = consecutive();
class AccordionItem extends Component {
    state = {
        itemUuid: nextUuid()
    };

    static propTypes = {
        rootTag: PropTypes.string,
        children: PropTypes.node,
        expanded: PropTypes.bool,
        onClick: PropTypes.func,
        className: PropTypes.string,
        hideContentClassName: PropTypes.string
    };

    static defaultProps = {
        rootTag: 'div',
        children: null,
        allowMultiple: true,
        expanded: false,
        onClick: () => {},
        className: '',
        hideContentClassName: ''
    };

    static contextTypes = {
        theme: PropTypes.object
    };

    renderChildren() {
        const { expanded, onClick, children } = this.props;
        const { itemUuid } = this.state;

        return React.Children.map(children, (item) => {
            const itemProps = {};

            if (item.type.accordionElementName === 'AccordionItemTitle') {
                itemProps.expanded = expanded;
                itemProps.key = 'title';
                itemProps.id = `accordion__title-${itemUuid}`;
                itemProps.onClick = onClick;
                return React.cloneElement(item, itemProps);
            } else if (item.type.accordionElementName === 'AccordionItemBody') {
                itemProps.expanded = expanded;
                itemProps.key = 'body';
                itemProps.id = `accordion__body-${itemUuid}`;
                return React.cloneElement(item, itemProps);
            }

            return item;
        });
    }

    render() {
        const { rootTag: Root, className, expanded, hideContentClassName } = this.props;
        const { theme } = this.context;
        const itemClassName = cn(
            theme.accordion__item,
            className,
            {
                [hideContentClassName]: (!expanded && hideContentClassName)
            },
        );

        return (
            <Root className={itemClassName}>
                {this.renderChildren()}
            </Root>
        );
    }
}

export default AccordionItem;

